const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/auth");

// GET /api/products?category=cement
router.get("/", async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter).sort({ category: 1, name: 1 });
    res.json({ products });
  } catch {
    res.status(500).json({ message: "Could not fetch products." });
  }
});

// GET /api/products/:productId
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId, isActive: true });
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ product });
  } catch {
    res.status(500).json({ message: "Could not fetch product." });
  }
});

// Admin only: create/update/delete products
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created.", product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:productId", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product updated.", product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:productId", protect, adminOnly, async (req, res) => {
  try {
    await Product.findOneAndUpdate({ productId: req.params.productId }, { isActive: false });
    res.json({ message: "Product deactivated." });
  } catch {
    res.status(500).json({ message: "Could not delete product." });
  }
});

module.exports = router;
