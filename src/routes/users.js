const express = require("express");
const router = express.Router();
const UseController = require("../controller/users");
const verifyTokenMiddleware = require("../middleware/authMiddleware");
const uploud = require("../middleware/multer.js");

router.use(verifyTokenMiddleware);

router.patch("/", UseController.updateUser);

router.get("/", UseController.getAllUsers);

router.post("/", UseController.createNewUser);

router.delete("/:userId", UseController.deleteUser);

router.post("/uploud", uploud.single("photo"), UseController.uploud);

module.exports = router;
