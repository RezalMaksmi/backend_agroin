const express = require("express");
const router = express.Router();
const SpaceController = require("../controller/space");
const verifyTokenMiddleware = require("../middleware/authMiddleware");

router.use(verifyTokenMiddleware);

router.get("/", SpaceController.getSpaces);
router.post("/", SpaceController.createSpace);
router.post("/:id/followers", SpaceController.insertSpaceFollower);
router.delete("/:id/followers", SpaceController.removeSpaceFollower);
router.get("/:id", SpaceController.getSpaceById);
router.delete("/:id", SpaceController.deleteSpaceById);

module.exports = router;
