const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../users/users");
const mysql = require("mysql2");
const dbPool = require("../config/database");
const router = express.Router();
const UserModel = require("../models/users");

const SECRET_KEY = "key"; // Ganti dengan secret key yang lebih kuat di production

// Endpoint untuk login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //   return dbPool.execute(SQLQuery);
  const [data] = await UserModel.getAllUsers();
  const user = data.find((u) => u.email === email);
  console.log(data);
  if (!user) {
    return res.status(401).json({ message: "Email anda belum terdaftar" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  //   const validPassword = await (password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

module.exports = router;
