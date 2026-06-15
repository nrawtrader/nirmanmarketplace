const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect any route — requires valid JWT in Authorization header
const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized. Please sign in." });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-__v");
    if (!req.user || !req.user.isActive) {
      return res.status(401).json({ message: "User not found or deactivated." });
    }
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Allow only admins
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
};

module.exports = { protect, adminOnly };
