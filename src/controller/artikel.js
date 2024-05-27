const ArtikelModel = require("../models/artikel");

const getAllArtikel = async (req, res) => {
  try {
    const [data] = await ArtikelModel.getAllArtikel();

    res.json({
      message: "Get All Artikel success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const createNewArtikel = async (req, res) => {
  const { body } = req;

  if (
    !body.title ||
    !body.slug ||
    !body.content ||
    !body.summary ||
    !body.featured_image
  ) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    await ArtikelModel.createArtikel(body);

    res.status(201).json({
      message: "Create new Artikel success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllArtikel,
  createNewArtikel,
};
