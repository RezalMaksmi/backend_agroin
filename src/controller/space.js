const SpaceModel = require("../models/space");

const getSpaces = async (req, res) => {
  try {
    const [spaces] = await SpaceModel.getSpaces();

    res.json({
      data: {
        spaces,
      },
      message: "sukses mengambil data ruang",
    });
  } catch (e) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const createSpace = async (req, res) => {
  const { title, description } = req.body;

  try {
    const [result] = await SpaceModel.createSpace({
      userId: req.userId,
      title,
      description,
    });

    res.json({
      data: {
        space: {
          id: result.insertId,
        },
      },
      message: "sukses membuat space",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  getSpaces,
  createSpace,
};
