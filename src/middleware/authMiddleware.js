// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();
const SECRET_KEY = "key"; // Sama dengan yang digunakan di auth.js
function verifyToken(req, res, next) {
  // ============
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
