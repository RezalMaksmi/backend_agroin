const express = require("express");
const router = express.Router();
const UseController = require("../controller/auth");

// Endpoint untuk login

router.post("/register", UseController.register);

router.post("/login", UseController.authLogin);

module.exports = router;
