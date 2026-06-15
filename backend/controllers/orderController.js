const Order = require("../models/Order");

// POST /api/orders  (protected)
const createOrder = async (req, res) => {
  try {
    const { items, total, form, paymentMethod } = req.body;

    if (!items?.length || !total || !form) {
      return res.status(400).json({ message: "Missing order details." });
    }

    // Validate required form fields
    const required = ["name", "phone", "address", "city", "state", "pincode"];
    for (const field of required) {
      if (!form[field]) return res.status(400).json({ message: `Missing field: ${field}` });
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      return res.status(400).json({ message: "Invalid pincode." });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      form,
      paymentMethod: paymentMethod || "cod",
    });

    res.status(201).json({
      message: "Order placed successfully!",
      orderId: order.orderId,
      estimatedDelivery: order.estimatedDelivery,
      order,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Could not place order. Try again." });
  }
};

// GET /api/orders  (protected) — list current user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch orders." });
  }
};

// GET /api/orders/:orderId  (public) — track by order ID string like NM-260615-1234
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId.toUpperCase() })
      .populate("user", "phone name");

    if (!order) return res.status(404).json({ message: "Order not found." });

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch order." });
  }
};

// PUT /api/orders/:id/cancel  (protected) — cancel before dispatched
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found." });
    if (["dispatched", "delivered"].includes(order.status)) {
      return res.status(400).json({ message: "Cannot cancel after dispatch." });
    }
    order.status = "cancelled";
    await order.save();
    res.json({ message: "Order cancelled.", order });
  } catch (err) {
    res.status(500).json({ message: "Could not cancel order." });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, cancelOrder };
