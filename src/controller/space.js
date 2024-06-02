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

const getSpaceById = async (req, res) => {
  const { id } = req.params;
  const [spaces] = await SpaceModel.getSpaceById(id);
  const space = spaces[0];

  // TODO: get posts from current space

  if (!space) {
    return res.status(404).json({
      message: "ruang tidak ditemukan",
    });
  }

  const isOwned = req.userId === space.user_id;

  return res.json({
    data: {
      space: {
        ...space,
        is_owned: isOwned,
      },
    },
  });
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
  getSpaceById,
  createSpace,
};
