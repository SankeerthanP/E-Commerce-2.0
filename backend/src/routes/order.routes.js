import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      const quantity = item.quantity || 1;
      const priceAtPurchase = product.price;
      totalAmount += priceAtPurchase * quantity;
      orderItems.push({
        product: product._id,
        quantity,
        priceAtPurchase,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "PLACED",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Could not place order" });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product")
    .sort({ createdAt: -1 });
  res.json(orders);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product user");
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  if (String(order.user._id) !== String(req.user._id) && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not allowed" });
  }
  res.json(order);
});

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  const orders = await Order.find()
    .populate("user")
    .sort({ createdAt: -1 });
  res.json(orders);
});

router.put("/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;
  if (!["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(order);
});

export default router;


