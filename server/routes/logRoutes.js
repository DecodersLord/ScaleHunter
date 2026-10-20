import express from "express";

import { authenticateToken } from "../middleware/authentication.js";

import { get_logs, delete_logs } from "../controllers/LogsController.js";
const logRouter = express.Router();

logRouter.get("/", authenticateToken, get_logs);

logRouter.delete("/", authenticateToken, delete_logs);

export default logRouter;