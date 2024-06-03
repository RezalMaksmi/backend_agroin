const SpaceModel = require("../models/space");

const getFollowedSpace = async () => {
  try {
    const [spaces] = await SpaceModel.getFollowedSpace(req.userId);

    return res.json({
      spaces,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const getOwnedSpaces = async () => {
  try {
    const [spaces] = await SpaceModel.getOwnedSpaces(req.userId);

    return res.json({
      spaces,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const getSpaces = async (req, res) => {
  const { filter } = req.query;

  switch (filter) {
    case "owned":
      try {
        const [spaces] = await SpaceModel.getOwnedSpaces(req.userId);

        res.json({
          data: {
            spaces,
          },
          message: "sukses mengambil data ruang yang dibuat",
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: "server error",
        });
      }
      break;
    case "following":
      try {
        const [spaces] = await SpaceModel.getFollowedSpaces(req.userId);

        res.json({
          data: {
            spaces,
          },
          message: "sukses mengambil data ruang yang diikuti",
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: "server error",
        });
      }
      break;
    default:
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

const deleteSpaceById = async (req, res) => {
  const { id } = req.params;

  try {
    const [spaces] = await SpaceModel.getSpaceById(id);
    const space = spaces[0];
    if (!space) {
      return res.status(404).json({
        message: "ruang tidak ditemukan",
      });
    }

    if (space.user_id !== req.userId) {
      return res.status(404).json({
        message: "ruang tidak ditemukan",
      });
    }

    const [result] = await SpaceModel.deleteSpaceById(id);
    if (!result.affectedRows) {
      return res.status(404).json({
        message: "gagal menghaps ruang",
      });
    }

    res.json({
      message: "sukses menghapus ruang",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

const insertSpaceFollower = async (req, res) => {
  const { id: spaceId } = req.params;
  try {
    const [result] = await SpaceModel.insertSpaceFollower(spaceId, req.userId);
    if (!result.affectedRows) {
      return res.status(404).json({
        message: "gagal mengikuti ruang",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }

  return res.json({
    message: "sukses mengikuti ruang",
  });
};

const removeSpaceFollower = async (req, res) => {
  const { id: spaceId } = req.params;

  try {
    const [result] = await SpaceModel.removeSpaceFollower(spaceId, req.userId);
    if (!result.affectedRows) {
      return res.status(404).json({
        message: "gagal batal mengikuti ruang",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }

  return res.json({
    message: "sukses batal mengikuti ruang",
  });
};

module.exports = {
  getSpaces,
  getSpaceById,
  createSpace,
  deleteSpaceById,
  insertSpaceFollower,
  removeSpaceFollower,
};
