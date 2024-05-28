const express = require("express");
const router = express.Router();
const UseController = require("../controller/auth");
const verifyToken = require("../middleware/authMiddleware");

// Endpoint untuk login

router.post("/login", UseController.authLogin);

router.patch("/update", verifyToken, UseController.updateUser);

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
