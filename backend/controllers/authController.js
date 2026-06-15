const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");
const OtpSession = require("../models/OtpSession");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

// In demo mode (no MSG91 key), OTP is returned in the response for testing
const isDemoMode = !process.env.MSG91_AUTH_KEY || process.env.MSG91_AUTH_KEY === "your_msg91_auth_key";

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

// Send OTP via MSG91 (real) or return it in response (demo)
const sendOtpToPhone = async (phone, otp) => {
  if (isDemoMode) return; // demo: otp returned to client

  await axios.post(
    "https://control.msg91.com/api/v5/otp",
    {
      template_id: process.env.MSG91_TEMPLATE_ID,
      mobile: `91${phone}`,
      authkey: process.env.MSG91_AUTH_KEY,
      otp,
    }
  );
};

// POST /api/auth/send-otp
const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: "Enter a valid 10-digit Indian mobile number." });
    }

    // Delete any existing OTP session for this phone
    await OtpSession.deleteMany({ phone });

    const otp = generateOtp();
    await OtpSession.create({ phone, otp });
    await sendOtpToPhone(phone, otp);

    const response = { message: "OTP sent successfully." };
    if (isDemoMode) {
      response.demoOtp = otp; // only in development — remove in production
      response.note = "Demo mode: OTP returned here. Set MSG91 keys in .env to send real SMS.";
    }
    res.json(response);
  } catch (err) {
    console.error("Send OTP error:", err.message);
    res.status(500).json({ message: "Failed to send OTP. Try again." });
  }
};

// POST /api/auth/verify-otp
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, name } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required." });
    }

    const session = await OtpSession.findOne({ phone });
    if (!session) {
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    // Limit brute-force: max 5 attempts
    if (session.attempts >= 5) {
      await OtpSession.deleteMany({ phone });
      return res.status(429).json({ message: "Too many attempts. Request a new OTP." });
    }

    if (session.otp !== otp) {
      session.attempts += 1;
      await session.save();
      return res.status(400).json({ message: `Incorrect OTP. ${5 - session.attempts} attempts left.` });
    }

    // OTP correct — delete session
    await OtpSession.deleteMany({ phone });

    // Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone, name: name?.trim() || undefined });
    } else if (name?.trim() && !user.name) {
      user.name = name.trim();
      await user.save();
    }

    res.json({
      message: "Signed in successfully.",
      token: generateToken(user._id),
      user: { id: user._id, phone: user.phone, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Verify OTP error:", err.message);
    res.status(500).json({ message: "Server error. Try again." });
  }
};

// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  res.json({ user: { id: req.user._id, phone: req.user.phone, name: req.user.name, role: req.user.role } });
};

// PUT /api/auth/me  (protected) — update name
const updateMe = async (req, res) => {
  try {
    const { name } = req.body;
    req.user.name = name?.trim() || req.user.name;
    await req.user.save();
    res.json({ message: "Profile updated.", user: { id: req.user._id, phone: req.user.phone, name: req.user.name } });
  } catch (err) {
    res.status(500).json({ message: "Could not update profile." });
  }
};

module.exports = { sendOtp, verifyOtp, getMe, updateMe };
