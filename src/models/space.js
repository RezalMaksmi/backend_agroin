const dbPool = require("../config/database");

const getSpaces = () => {
  const query = "SELECT * FROM spaces";

  return dbPool.execute(query);
};

const createSpace = ({ userId, title, description }) => {
  const query = "INSERT INTO spaces(user_id, title, description) VALUES(?,?,?)";
  const values = [userId, title, description];

  return dbPool.execute(query, values);
};

const getSpaceById = (id) => {
  const query = "SELECT * FROM spaces WHERE id = ?";
  const values = [id];

  return dbPool.execute(query, values);
};

module.exports = {
  getSpaces,
  getSpaceById,
  createSpace,
};
