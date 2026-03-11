import express from "express";
import { getCurrentChallenge } from "../controllers/challengeController.js";

const router = express.Router();

router.get("/current", getCurrentChallenge);

export default router;