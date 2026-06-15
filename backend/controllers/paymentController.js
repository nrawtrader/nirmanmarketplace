const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payments/create-order
// Called before showing Razorpay payment dialog on frontend
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body; // amount in paise (₹1 = 100 paise)

    const options = {
      amount: Math.round(amount * 100), // convert ₹ to paise
      currency: "INR",
      receipt: orderId,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save razorpay order ID to our order
    await Order.findOneAndUpdate({ orderId }, { razorpayOrderId: razorpayOrder.id });

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay create order error:", err);
    res.status(500).json({ message: "Payment initiation failed." });
  }
};

// POST /api/payments/verify
// Called after user completes payment — verifies signature to confirm it's real
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    // Signature = HMAC-SHA256 of "razorpayOrderId|razorpayPaymentId" using your secret key
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Payment verification failed. Possible fraud." });
    }

    // Payment is genuine — mark it as paid
    await Order.findOneAndUpdate(
      { orderId },
      { paymentStatus: "paid", razorpayPaymentId, status: "processing" }
    );

    res.json({ message: "Payment verified successfully.", paid: true });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ message: "Could not verify payment." });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };
