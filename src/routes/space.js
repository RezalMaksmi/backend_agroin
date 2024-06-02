const express = require("express");
const router = express.Router();
const SpaceController = require("../controller/space");
const verifyTokenMiddleware = require("../middleware/authMiddleware");

router.use(verifyTokenMiddleware);

router.get("/", SpaceController.getSpaces);
router.post("/", SpaceController.createSpace);
router.get("/:id", SpaceController.getSpaceById);
router.delete("/:id", SpaceController.deleteSpaceById);

module.exports = router;
