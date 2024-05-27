const dbPool = require("../config/database");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const getAllArtikel = () => {
  const SQLQuery = "SELECT * FROM artikel ";

  return dbPool.execute(SQLQuery);
};

const createArtikel = (body) => {
  const id = uuidv4();
  const SQLQuery = `INSERT INTO artikel (id , title, slug, content, summary, featured_image) VALUES ('${id}', '${body.title}','${body.slug}','${body.content}','${body.summary}','${body.featured_image}')`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllArtikel,
  createArtikel,
};
