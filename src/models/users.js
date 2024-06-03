const dbPool = require("../config/database");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users ";

  return dbPool.execute(SQLQuery);
};

const createNewUser = (body) => {
  const id = uuidv4();
  const SQLQuery = `INSERT INTO users (id, username, email, password) 
  VALUES ('${id}','${body.name}', '${body.email}','${bcrypt.hashSync(
    body.password
  )}')`;

  return dbPool.execute(SQLQuery);
};

const updateUsers = (body, idUser) => {
  const SQLQuery = `UPDATE users SET username='${body.username}', email='${body.email}', job='${body.job}', phone_number='${body.phone_number}' WHERE id=${idUser}`;

  return dbPool.execute(SQLQuery);
};

const deleteUser = (idUser) => {
  const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;

  return dbPool.execute(SQLQuery);
};

const updateFoto = (table, field, value, idUser) => {
  const SQLQuery = `UPDATE ${table} SET ${field}='${value}' WHERE id='${idUser}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUsers,
  deleteUser,
  updateFoto,
};
