const express = require("express");
const router = express.Router();
const UseController = require("../controller/artikel");
const verifyToken = require("../middleware/authMiddleware");
const uploud = require("../middleware/multer.js");

router.get("/", UseController.getAllArtikel);

router.get("/search", UseController.searchArtikel);

router.get("/:slug", UseController.getArtikelBySlug);

router.post("/", UseController.createNewArtikel);

router.post("/uploud/:slug", uploud.single("photo"), UseController.uploud);
module.exports = router;
