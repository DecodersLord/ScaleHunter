import dungeonData from "../../app/(system)/dungeon/dungeonData.json" with { type: "json" };

import { createDungeon, updateDungeonResult } from "../db/queries/dungeons.js";

import openAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new openAI();

const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const random_dungeon_list = z.object({
  title: z.string(),
  description: z.string(),
  rank: z.string(),
  xp: z.number(),
  targetArchitecture: z.array(z.string()),
  status: z.string(),
  masteryQuadrant: z.string(),
});

const DungeonResponseSchema = z.object({
  dungeons: z.array(random_dungeon_list),
});

const system_prompt = {
  role: "system",
  content: `
      You are a senior level developer or interviewer for a company. Your task is to generate 
      a solo-leveling style problem statement related to system design problems called dungeon for the user. The problem statement
      should be relative to user's difficulty category divided in 5 different ranks as below:
      
      
      "S": "Expert or senior level user can solve hard architectural problem with ease",
      "A": "High-mid expertiese struggle in edge cases and difficult issues" 
      "B": "Mid tier user, struggles with scaling or caching issues" 
      "C": "User has just started getting grasps of the architectural language and problems"
      "D": "User has started understanding the patterns and basic requirements struggle with other technicalities"
      "E": "Novice/beginner in system design, struggle with understanding problem statements accurately";

      "You MUST generate exactly 18 dungeons in total. You must generate exactly 3 dungeons
      for Rank S, exactly 3 for Rank A, exactly 3 for Rank B, exactly 3 for Rank C, 
      exactly 3 for Rank D, and exactly 3 for Rank E."

      The mastery quadrant is divided as below: Latency, Availability, Scalability and Consistency.
    `,
};

export const dungeon_detail = async (req, res, next) => {
  const { id } = req.params;
  let dungeon = dungeonData.find((d) => d.id === id);

  if (!dungeon) {
    res.status(404).send({ message: `dungeon with ${id} not found` });
  } else {
    res.send(dungeon);
  }
};

export const submit_dungeon = async (req, res, next) => {
  try {
    const { dungeonId, xp_earned, score, user_submission, ai_feedback } =
      req.body;

    if (dungeonId === "") {
      res.status(400).send({ message: "dungeonId must be non-empty string" });
    } else if (user_submission.length <= 50) {
      res
        .status(400)
        .send({ message: "submission must be greater than 50 characters" });
    } else {
      const result = await updateDungeonResult(
        req.user.email,
        dungeonId,
        xp_earned,
        score,
        user_submission,
        ai_feedback,
      );
      res.status(200).json({ message: "Dungeon cleared!", result });
    }
  } catch (e) {
    res.status(400).json({ error: "Failed to submit dungeons" });
  }
};

export const generate_dungeon = async (req, res, next) => {
  try {
    const response = await openai.responses.parse({
      model: "gpt-4o-mini",
      input: [system_prompt],
      text: {
        format: zodTextFormat(DungeonResponseSchema, "dungeon_generation"),
      },
    });

    const dungeon_list = response.output_parsed.dungeons;

    const result = await createDungeon(dungeon_list);

    res.status(201).json({ message: "Dungeons generated", data: dungeon_list });
  } catch (e) {
    res.status(500).json({ error: "Failed to generate dungeons" });
  }
};
