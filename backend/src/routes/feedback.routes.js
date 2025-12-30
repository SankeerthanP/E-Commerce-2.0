import express from "express";
import Feedback from "../models/Feedback.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message, userId } = req.body;
    const feedback = await Feedback.create({
      name,
      email,
      message,
      user: userId || null,
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: "Could not submit feedback" });
  }
});

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

export default router;


