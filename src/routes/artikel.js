const express = require("express");
const router = express.Router();
const UseController = require("../controller/artikel");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", UseController.getAllArtikel);

router.post("/", UseController.createNewArtikel);

module.exports = router;
