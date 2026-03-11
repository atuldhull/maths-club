import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// This matches the "action" in your HTML forms
router.post("/register", authController.register);

// Login route (can enable when login controller exists)
// router.post("/login", authController.login);

export default router;