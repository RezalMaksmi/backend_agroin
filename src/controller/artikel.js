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

const getArtikelBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const [data] = await ArtikelModel.getArtikelBySlug(slug);

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

const searchArtikel = async (req, res) => {
  const searchQuery = req.query.q;
  const searchValue = `%${searchQuery}%`;

  try {
    const [data] = await ArtikelModel.searchArtikel(searchValue);

    res.json({
      message: "Search Artikel success",
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

const uploud = async (req, res) => {
  const fileName = req.file.filename;
  const slug = req.params.slug;

  try {
    await ArtikelModel.updateFoto("artikel", "featured_image", fileName, slug);
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
  getAllArtikel,
  createNewArtikel,
  getArtikelBySlug,
  searchArtikel,
  uploud,
};
