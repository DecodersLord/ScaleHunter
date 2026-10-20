import { pool } from "../pool.js";

export async function createUser(email, passwordHash, hunterName) {
  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, hunter_name) values ($1, $2, $3)",
      [email, passwordHash, hunterName],
    );

    return JSON.stringify({ status: "OK" });
  } catch (e) {
    console.log(e);
    console.log(`error inserting new user: ${e.message}`);

    return JSON.stringify({ status: "failed" });
  }
}

export async function findUserByEmail(email) {
  try {
    const result = await pool.query(
      "SELECT hunter_name, email, current_xp, password_hash FROM users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (e) {
    return null;
  }
}
