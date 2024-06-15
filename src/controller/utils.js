const upload = async (req, res) => {
  try {
    const fileName = req.file.filename;
    res.json({
      message: "upload berhasil",
      filename: fileName,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "upload gagal",
      error,
    });
  }
};

module.exports = {
  upload,
};
