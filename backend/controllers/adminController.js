const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

// GET /api/admin/dashboard
const getDashboard = async (req, res) => {
  try {
    const [totalOrders, totalUsers, totalRevenue, recentOrders] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: "customer" }),
      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(10).populate("user", "phone name"),
    ]);

    res.json({
      stats: {
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not load dashboard." });
  }
};

// GET /api/admin/orders
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("user", "phone name");
    const total = await Order.countDocuments(filter);
    res.json({ orders, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch orders." });
  }
};

// PUT /api/admin/orders/:orderId/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["confirmed", "processing", "dispatched", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    ).populate("user", "phone name");
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json({ message: "Order status updated.", order });
  } catch (err) {
    res.status(500).json({ message: "Could not update order." });
  }
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch users." });
  }
};

// PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["customer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ message: "User role updated.", user });
  } catch (err) {
    res.status(500).json({ message: "Could not update user." });
  }
};

module.exports = { getDashboard, getAllOrders, updateOrderStatus, getAllUsers, updateUserRole };
