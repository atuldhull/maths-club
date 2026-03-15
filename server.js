import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" }); // Load env FIRST

import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import adminRoutes       from "./routes/adminRoutes.js";
import userRoutes        from "./routes/userRoutes.js";
import pageRoutes        from "./routes/pageRoutes.js";
import authRoutes        from "./routes/authRoutes.js";
import challengeRoutes   from "./routes/challengeRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import arenaRoutes       from "./routes/arenaRoutes.js";
import eventRoutes       from "./routes/eventRoutes.js";

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* ==========================
   MIDDLEWARE
========================== */

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "math_collective_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

/* ==========================
   ROUTES
========================== */

app.use("/api/admin", adminRoutes);
app.use("/", pageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/arena", arenaRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);

/* ==========================
   SERVER START
========================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
🚀 MATH COLLECTIVE SERVER RUNNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 http://localhost:${PORT}

🧠 Engineering Math Challenge Engine : ACTIVE
🤖 AI Question Generator             : ACTIVE
🏆 Leaderboard System                : ACTIVE
⚔ Arena Solver System               : ACTIVE
🔐 Supabase Authentication           : ACTIVE
📅 Events API                        : ACTIVE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
});
