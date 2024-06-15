const express = require("express");
const app = express.Router();
const FoodController = require("../controller/food");

app.get("/", FoodController.getFoods);

module.exports = app;
