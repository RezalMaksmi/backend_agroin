const express = require("express");
const router = express.Router();
const PostController = require("../controller/posts");
const verifyTokenMiddleware = require("../middleware/authMiddleware");

router.use(verifyTokenMiddleware);

router.post("/", PostController.createPost);

module.exports = router;
