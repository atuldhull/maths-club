import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/events.html"));
});

router.get('/arena', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/arena.html'));
});

router.get('/arena',(req,res)=>{
res.sendFile(path.join(__dirname,'../views/arena.html'));
});

export default router;