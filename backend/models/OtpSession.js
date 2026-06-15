const mongoose = require("mongoose");

// Each document lives for 10 minutes then MongoDB auto-deletes it
const otpSessionSchema = new mongoose.Schema({
  phone: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // TTL: 10 min
});

module.exports = mongoose.model("OtpSession", otpSessionSchema);
