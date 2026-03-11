import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import pageRoutes from "./routes/pageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import aiChallengeRoutes from "./routes/aiChallengeRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import arenaRoutes from "./routes/arenaRoutes.js";

// Load environment variables
dotenv.config({ path: "./.env.local" });

const app = express();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "math_collective_secret",
    resave: false,
    saveUninitialized: false,
  })
);

/*
We are using Supabase (cloud database)
so we do NOT need a local MongoDB connection.
*/

// Routes
app.use("/", pageRoutes);
app.use("/api/auth", authRoutes);

// Challenge systems
app.use("/api/challenge", challengeRoutes); // weekly challenge from Supabase
app.use("/api/ai", aiChallengeRoutes); // Gemini AI challenge generator

// Leaderboard + Arena
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/arena", arenaRoutes);

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
🚀 ARCHITECT SYSTEM ONLINE
🔗 http://localhost:${PORT}

🧠 Weekly Challenge Engine: ACTIVE
🤖 AI Challenge Generator: ACTIVE
🏆 Leaderboard Engine: ACTIVE
⚔️ Arena Solver System: ACTIVE
🔐 Auth Provider: Supabase
`);
});