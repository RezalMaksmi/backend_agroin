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

const updateUsers = (body, userId) => {
  const SQLQuery = `UPDATE users SET username='${body.username}', email='${body.email}', job='${body.job}', phone_number='${body.phone_number}' WHERE id="${userId}"`;

  return dbPool.execute(SQLQuery);
};

const deleteUser = (userId) => {
  const SQLQuery = `DELETE FROM users WHERE id=${userId}`;

  return dbPool.execute(SQLQuery);
};

const updateFoto = (table, field, value, userId) => {
  const SQLQuery = `UPDATE ${table} SET ${field}='${value}' WHERE id='${userId}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUsers,
  deleteUser,
  updateFoto,
};
