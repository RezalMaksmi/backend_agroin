const express = require("express");
const router = express.Router();
const UseController = require("../controller/users");
const verifyToken = require("../middleware/authMiddleware");
router.get("/", verifyToken, UseController.getAllUsers);

router.post("/", UseController.createNewUser);

router.patch("/:idUser", verifyToken, UseController.updateUser);

router.delete("/:idUser", verifyToken, UseController.deleteUser);

module.exports = router;
