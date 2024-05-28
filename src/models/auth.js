const dbPool = require("../config/database");
const bcrypt = require("bcryptjs");

const getUsers = () => {
  const SQLQuery = "SELECT * FROM users ";

  return dbPool.execute(SQLQuery);
};

const updateUsers = (body, idUser) => {
  const SQLQuery = `UPDATE users SET name='${body.name}', email='${
    body.email
  }', profile_image='${body.profile_image}', job='${
    body.job
  }',  password='${bcrypt.hashSync(body.password)}'  WHERE id="${idUser}"`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getUsers,
  updateUsers,
};
