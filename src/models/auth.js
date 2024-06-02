const dbPool = require("../config/database");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const getUsers = () => {
  const SQLQuery = "SELECT * FROM users ";

  return dbPool.execute(SQLQuery);
};

const registerUser = (body) => {
  const id = uuidv4();
  const SQLQuery = `INSERT INTO users (id, username, email, password) 
  VALUES ('${id}','${body.name}', '${body.email}','${bcrypt.hashSync(
    body.password
  )}')`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getUsers,
  registerUser,
};
