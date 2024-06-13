const express = require("express");
const router = express.Router();
const UtilsController = require("../controller/utils");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/multer.js");

router.post(
  "/image-upload",
  verifyToken,
  upload.single("photo"),
  UtilsController.upload
);

module.exports = router;
