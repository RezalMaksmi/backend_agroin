const dbPool = require("../config/database");

const getSpaces = (userId) => {
  const query = `
  SELECT
    (select count(sf.follower_id) from space_followers sf where sf.space_id = s.id and sf.follower_id = ?) following,
    s.*,
    u.img "author_image"
  FROM
    spaces s
  JOIN
    users u ON s.user_id = u.id
  WHERE
    s.user_id != ?
  `;
  const values = [userId, userId];
  return dbPool.execute(query, values);
};

const getFollowedSpaces = (userId) => {
  const query = `
  SELECT
    s.*,
    u.img "author_image"
  FROM
    space_followers sf
  JOIN
    spaces s ON s.id = sf.space_id
  JOIN
    users u on u.id = s.user_id
  WHERE
    sf.follower_id = ?`;

  const values = [userId];

  return dbPool.execute(query, values);
};

const getOwnedSpaces = (userId) => {
  const query = `
  SELECT
    s.*,
    u.img "author_image"
  FROM
    spaces s
  JOIN
    users u ON u.id = s.user_id
  WHERE s.user_id = ?`;
  const values = [userId];

  return dbPool.execute(query, values);
};

const createSpace = ({ userId, title, description }) => {
  const query = "INSERT INTO spaces(user_id, title, description) VALUES(?,?,?)";
  const values = [userId, title, description];

  return dbPool.execute(query, values);
};

const getSpaceById = (userId, spaceId) => {
  const query = `
  SELECT
	(
		SELECT
			count(*)
		FROM
			space_followers sf
		WHERE
			sf.space_id = s.id
			AND sf.follower_id = ?) following,
		s.*
	FROM
		spaces s
  WHERE s.id = ?`;
  const values = [userId, spaceId];

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
  getFollowedSpaces,
  getOwnedSpaces,
  getSpaceById,
  createSpace,
  deleteSpaceById,
  insertSpaceFollower,
  removeSpaceFollower,
};
