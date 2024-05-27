const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../models/users");
const UseController = require("../controller/auth");

// Ganti dengan secret key yang lebih kuat di production
const SECRET_KEY = process.env.SECRET_KEY;

// Endpoint untuk login

router.post("/login", UseController.authLogin);

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   //   return dbPool.execute(SQLQuery);
//   const [data] = await UserModel.getAllUsers();
//   const user = data.find((u) => u.email === email);
//   // console.log(data);
//   if (!user) {
//     return res.status(401).json({ message: "Email anda belum terdaftar" });
//   }

//   const validPassword = await bcrypt.compare(password, user.password);
//   //   const validPassword = await (password, user.password);
//   if (!validPassword) {
//     return res.status(401).json({ message: "Invalid password" });
//   }

//   const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
//   res.json({
//     message: "Login successful",
//     token,
//     data: {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       profile_image: user.profile_image,
//       about: user.about,
//     },
//   });
// });

module.exports = router;
