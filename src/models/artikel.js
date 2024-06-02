const dbPool = require("../config/database");
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

const getArtikelBySlug = (slug) => {
  const SQLQuery = `SELECT * FROM artikel WHERE slug="${slug}"`;

  return dbPool.execute(SQLQuery);
};

const searchArtikel = (searchValue) => {
  const SQLQuery = `SELECT * FROM artikel WHERE slug LIKE '${searchValue}' `;

  return dbPool.execute(SQLQuery);
};

const updateFoto = (table, field, value, slug) => {
  const SQLQuery = `UPDATE ${table} SET ${field}='${value}' WHERE slug='${slug}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllArtikel,
  createArtikel,
  getArtikelBySlug,
  searchArtikel,
  updateFoto,
};
