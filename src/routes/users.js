const express = require("express");
const router = express.Router();
const UseController = require("../controller/users");
const verifyToken = require("../middleware/authMiddleware");
const uploud = require("../middleware/multer.js");

router.get("/", verifyToken, UseController.getAllUsers);

router.post("/", UseController.createNewUser);

router.patch("/:idUser", verifyToken, UseController.updateUser);

router.delete("/:idUser", verifyToken, UseController.deleteUser);

router.post(
  "/uploud",
  verifyToken,
  uploud.single("photo"),
  UseController.uploud
);

module.exports = router;
