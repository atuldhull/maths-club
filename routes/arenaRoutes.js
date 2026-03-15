import express from "express";
import { submitSolve, getHistory } from "../controllers/arenaController.js";

const router = express.Router();

router.post("/submit", submitSolve);

router.get("/history", getHistory);

export default router;
