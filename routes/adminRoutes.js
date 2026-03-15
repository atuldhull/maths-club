import express from "express";
import { generateAIQuestion, saveAIQuestion } from "../controllers/adminController.js";

const router = express.Router();

router.get("/generate", generateAIQuestion);

router.post("/save", saveAIQuestion);

export default router;