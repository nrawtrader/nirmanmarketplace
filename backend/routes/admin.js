const express = require("express");
const router = express.Router();
const { getDashboard, getAllOrders, updateOrderStatus, getAllUsers, updateUserRole } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/auth");

// All admin routes require login + admin role
router.use(protect, adminOnly);

router.get("/dashboard", getDashboard);
router.get("/orders", getAllOrders);
router.put("/orders/:orderId/status", updateOrderStatus);
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

module.exports = router;
