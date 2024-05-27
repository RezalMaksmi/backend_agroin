const dbPool = require("../config/database");

const getUsers = () => {
  const SQLQuery = "SELECT * FROM users ";

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getUsers,
};
