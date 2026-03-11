import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/daily", async (req, res) => {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Generate a HARD university level mathematics problem.

Return ONLY valid JSON in this format:

{
"title": "short challenge title",
"problem": "full problem statement",
"killTitle": "nickname for leaderboard"
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text().replace(/```json|```/g, "");

    const data = JSON.parse(text);

    res.json(data);

  } catch (error) {

    console.error("Gemini error:", error);

    res.status(500).json({
      error: "AI challenge generation failed"
    });

  }

});

export default router;