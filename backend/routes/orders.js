const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, cancelOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);
router.get("/:orderId", getOrderById);           // public — for track order page
router.put("/:orderId/cancel", protect, cancelOrder);

module.exports = router;
