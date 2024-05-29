const express = require("express");
const router = express.Router();
const UseController = require("../controller/artikel");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", UseController.getAllArtikel);

router.get("/search", UseController.searchArtikel);

router.get("/:slug", UseController.getArtikelBySlug);

router.post("/", UseController.createNewArtikel);

module.exports = router;
