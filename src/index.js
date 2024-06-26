require("dotenv").config();
const express = require("express");

const usersRoutes = require("./routes/users.js");
const artikelRoutes = require("./routes/artikel.js");
const spaceRoutes = require("./routes/space.js");
const postRoutes = require("./routes/posts.js");
const foodRoutes = require("./routes/foods.js");
const utilsRoutes = require("./routes/utils.js");

const middlewareLogRequest = require("./middleware/logs.js");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware untuk menangani parsing body request
app.use(bodyParser.json());

// Menggunakan routing auth
app.use("/auth", authRoutes);

app.use(middlewareLogRequest);
// midleware mengizinkan request body berupa json
app.use(express.json());
app.use("/assets", express.static("public"));

// routing
app.use("/users", usersRoutes);
app.use("/artikel", artikelRoutes);
app.use("/spaces", spaceRoutes);
app.use("/posts", postRoutes);

app.use("/food-prices", foodRoutes);
app.use("/utils", utilsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome To API Agroin");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
