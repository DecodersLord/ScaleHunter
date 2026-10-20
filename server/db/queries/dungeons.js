import { pool } from "../pool.js";

export async function createDungeon(dungeon_list) {
  if (!dungeon_list || dungeon_list.length === 0) return;

  // 1. Extract separate arrays for each column
  const titles = dungeon_list.map((d) => d.title);
  const descriptions = dungeon_list.map((d) => d.description);
  const ranks = dungeon_list.map((d) => d.rank);
  const xps = dungeon_list.map((d) => d.xp);
  const targetArchitectures = dungeon_list.map((d) => d.targetArchitecture);
  const statuses = dungeon_list.map((d) => d.status);
  const masteryQuadrants = dungeon_list.map((d) => d.masteryQuadrant);

  // 2. Insert using UNNEST across typed array parameters
  const queryText = `
    INSERT INTO dungeons (title, description, rank, xp, target_architecture, status, mastery_quadrant)
    SELECT * FROM UNNEST(
      $1::text[], 
      $2::text[], 
      $3::text[], 
      $4::int[], 
      $5::text[], 
      $6::text[], 
      $7::text[]
    )
  `;

  return await pool.query(queryText, [
    titles,
    descriptions,
    ranks,
    xps,
    targetArchitectures,
    statuses,
    masteryQuadrants,
  ]);
}

export async function updateDungeonResult(
  email,
  dungeon_id,
  score,
  xp_earned,
  user_submission,
  ai_feedback,
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const dungeon = await getDungeonById(client, dungeon_id);

    const user = await getUserByEmail(client, email);

    console.log(dungeon, user);

    const queryText_user_dungeon_attempts =
      "INSERT INTO user_dungeon_attempts (dungeon_id, user_id, score, xp_earned, user_submission, ai_feedback) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET score = $3, xp_earned = $4, user_submission = $5, ai_feedback = $6";

    const res_user_dungeon_attempts = await client.query(
      queryText_user_dungeon_attempts,
      [
        dungeon_id,
        user.id,
        score,
        xp_earned,
        user_submission,
        JSON.stringify(ai_feedback),
      ],
    );

    console.log("res_user_dungeon_attempts", res_user_dungeon_attempts);
    const queryText_update_user =
      "UPDATE users SET current_xp = current_xp + $1, total_cleared = total_cleared + 1 WHERE id = $2";

    const res_update_users = await client.query(queryText_update_user, [
      dungeon.xp,
      user.id,
    ]);

    console.log("res_update_users", res_update_users);
    const queryText_update_dungeon =
      "UPDATE dungeons SET STATUS = 'CLEARED' WHERE id = $1";

    const res_update_dungeon = await client.query(queryText_update_dungeon, [
      dungeon_id,
    ]);
    console.log("res_update_dungeon", res_update_dungeon);

    await client.query("COMMIT");

    return {
      status: "cleared",
      xpEarned: dungeon.xp,
      newTotalXp: user.current_xp + dungeon.xp,
    };
  } catch (e) {
    await client.query("ROLLBACK");
    console.log(`error finding user: ${e.message}`);
  } finally {
    client.release();
  }
}

async function getDungeonById(client, dungeon_id) {
  const queryText = "SELECT xp FROM dungeons WHERE id = $1";
  const result = await client.query(queryText, [dungeon_id]);

  return result.rows[0];
}

async function getUserByEmail(client, email) {
  const queryText =
    "SELECT id, email, rank, current_xp, total_cleared FROM users WHERE email = $1";
  const result = await client.query(queryText, [email]);

  return result.rows[0];
}
