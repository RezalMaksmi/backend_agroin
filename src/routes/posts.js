const express = require("express");
const router = express.Router();
const PostController = require("../controller/posts");
const verifyTokenMiddleware = require("../middleware/authMiddleware");

router.use(verifyTokenMiddleware);

router.post("/", PostController.createPost);
router.get("/:postId", PostController.getPostById);
router.post("/:postId/comments", PostController.createComment);
router.get("/:postId/comments", PostController.getCommentByPostId);
router.post("/:postId/comments/:commentId", PostController.voteComment);
router.delete("/:postId/comments/:commentId", PostController.unVoteComment);

module.exports = router;
