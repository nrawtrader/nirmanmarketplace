const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true }, // e.g. NM-260615-8261
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    form: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "upi", "bank"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    status: {
      type: String,
      enum: ["confirmed", "processing", "dispatched", "delivered", "cancelled"],
      default: "confirmed",
    },
    estimatedDelivery: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

// Auto-generate orderId before saving
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    this.orderId = `NM-${yy}${mm}${dd}-${rand}`;
    const deliveryDate = new Date(now);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    this.estimatedDelivery = deliveryDate.toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
