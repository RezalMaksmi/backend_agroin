require("dotenv").config();
const express = require("express");
const usersRoutes = require("./routes/users.js");
const middlewareLogRequest = require("./middleware/logs.js");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/authMiddleware");

const uploud = require("./middleware/multer.js");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk menangani parsing body request
app.use(bodyParser.json());

// Menggunakan routing auth
app.use("/auth", authRoutes);

// midleware mengizinkan request body berupa jsojn
app.use(middlewareLogRequest);
app.use(express.json());
app.use("/assets", express.static("public"));

app.use("/users", usersRoutes);

// Route dilindungi
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard", userId: req.userId });
});

app.get("/", (req, res) => {
  res.send("Welcome To API Agroin");
});
app.post("/uploud", uploud.single("photo"), (req, res) => {
  res.json({
    message: "uploud berhasil",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
