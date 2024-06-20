const UserModel = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    console.log(req.userId);
    const [data] = await UserModel.getAllUsers();

    res.json({
      message: "Get All User success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    await UserModel.createNewUser(body);

    res.status(201).json({
      message: "Create new User success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.userId);

    // const { userId } = req.params;
    const { body } = req;
    await UserModel.updateUsers(body, req.userId);

    res.json({
      message: "Update User success",
      data: {
        id: req.userId,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await UserModel.deleteUser(userId);

    res.json({
      message: "Delete User success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const uploud = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const userId = req.userId;

    await UserModel.updateFoto("users", "img", fileName, userId);
    res.json({
      message: "uploud berhasil",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "uploud Gagal",
      error,
    });
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  uploud,
};
