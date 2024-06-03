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

const deleteSpaceById = (id) => {
  const query = "DELETE FROM spaces WHERE id = ?";
  const values = [id];

  return dbPool.execute(query, values);
};

const insertSpaceFollower = (spaceId, userId) => {
  const query = "INSERT INTO space_followers(follower_id,space_id) VALUES(?,?)";
  const values = [userId, spaceId];

  return dbPool.execute(query, values);
};

const removeSpaceFollower = (spaceId, userId) => {
  const query =
    "DELETE FROM space_followers WHERE follower_id = ? AND space_id = ?";
  const values = [userId, spaceId];

  return dbPool.execute(query, values);
};

module.exports = {
  getSpaces,
  getSpaceById,
  createSpace,
  deleteSpaceById,
  insertSpaceFollower,
  removeSpaceFollower,
};
