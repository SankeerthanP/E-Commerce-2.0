import express from "express";
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    const stats = await Review.aggregate([
      { $match: { product: review.product } },
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$rating" },
          numReviews: { $sum: 1 },
        },
      },
    ]);

    if (stats.length) {
      await Product.findByIdAndUpdate(productId, {
        averageRating: stats[0].averageRating,
        numReviews: stats[0].numReviews,
      });
    }

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: "Could not add review" });
  }
});

router.get("/product/:productId", async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate("user", "name")
    .sort({ createdAt: -1 });
  res.json(reviews);
});

export default router;


