const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../models/auth");

const SECRET_KEY = process.env.SECRET_KEY;

// Endpoint untuk login
const authLogin = async (req, res) => {
  const { email, password } = req.body;

  const [data] = await auth.getUsers();
  const user = data.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Email anda belum terdaftar" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({
    message: "Login successful",
    token,
    data: {
      id: user.id,
      name: user.username,
      email: user.email,
      img: user.img,
      phone_number: user.phone_number,
      job: user.job,
    },
  });
};

const register = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
    });
  }

  try {
    await auth.registerUser(body);

    res.status(201).json({
      message: "Create new User success",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  authLogin,
  register,
};
