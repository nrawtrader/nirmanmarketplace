const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { sendOtp, verifyOtp, getMe, updateMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Prevent OTP spam: max 5 requests per phone per 15 minutes
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many OTP requests. Try again after 15 minutes." },
  keyGenerator: (req) => req.body.phone || req.ip,
});

router.post("/send-otp", otpLimiter, sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

module.exports = router;
