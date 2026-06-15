const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true }, // matches frontend id like "cem-1"
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: String,
      enum: ["cement", "steel", "sanitary", "paint", "aggregate"],
      required: true,
    },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    specs: { type: Map, of: String },
    tip: { type: String },
    stock: { type: Number, default: 999 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
