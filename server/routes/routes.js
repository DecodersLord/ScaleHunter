import express from "express";

import { query } from "express-validator";

import {
  check_health,
  middlewareTest,
} from "../controllers/IndexController.js";

const router = express.Router();

router.get("/api/health", check_health);

router.get("/middlewareTest", query("person").notEmpty(), middlewareTest);

export default router;
