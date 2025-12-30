import express from "express";
import Category from "../models/Category.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const category = await Category.create({ name, slug, description });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: "Could not create category" });
  }
});

router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: "Could not update category" });
  }
});

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ message: "Could not delete category" });
  }
});

export default router;


