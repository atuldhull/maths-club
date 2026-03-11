import express from "express";
import { submitSolve } from "../controllers/arenaController.js";

const router = express.Router();

// submit answer to arena
router.post("/solve", submitSolve);

export default router;