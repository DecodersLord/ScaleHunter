import express from "express";

import { authenticateToken } from "../middleware/authentication.js";

import {
  generate_dungeon,
  submit_dungeon,
  dungeon_detail,
} from "../controllers/DungeonController.js";

const dungeonRouter = express.Router();

dungeonRouter.get("/generate", authenticateToken, generate_dungeon);

dungeonRouter.get("/:id", authenticateToken, dungeon_detail);

dungeonRouter.post("/submit", authenticateToken, submit_dungeon);

export default dungeonRouter;
