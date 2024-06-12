const dbPool = require("../config/database");

const getPosts = () => {
  const query = `
  SELECT
    p.*,
    u.username,
    u.img "author_image",
    u.job,
    COUNT(c.id) "comment_count"
  FROM
    posts p
    JOIN users u ON u.id = p.user_id
    LEFT JOIN comments c ON c.post_id = p.id
  GROUP BY
    p.id;`;

  return dbPool.execute(query);
};

const getPostsBySpaceId = (spaceId) => {
  const query = `
  SELECT
    p.*,
    u.username,
    u.img "author_image",
    u.job,
    COUNT(c.id) "comment_count"
  FROM
    posts p
    JOIN users u ON u.id = p.user_id
    LEFT JOIN comments c ON c.post_id = p.id
  WHERE
    p.space_id = ?
  GROUP BY
    p.id;`;
  const values = [spaceId];
  return dbPool.execute(query, values);
};

const searchPost = (keyword) => {
  const query = `
    SELECT
        p.id,
        p.title,
        p.type,
        u.img "author_image"
    FROM
        posts p
    JOIN
        users u ON u.id = p.user_id
    WHERE p.title LIKE CONCAT('%', ?, '%')`;
  const values = [keyword];

  return dbPool.execute(query, values);
};

const insertPost = (
  spaceId = null,
  userId,
  type,
  title,
  description = null,
  img = null
) => {
  const query =
    "INSERT INTO posts(space_id, user_id, type, title, description, img) VALUES(?,?,?,?,?,?)";
  const values = [spaceId, userId, type, title, description, img];

  return dbPool.execute(query, values);
};

const getPostById = (id) => {
  const query = `
  SELECT
    p.*,
    u.username,
    u.img "author_image",
    u.job,
    COUNT(c.id) "comment_count"
  FROM
    posts p
  JOIN
    users u ON u.id = p.user_id
  LEFT JOIN
    comments c ON c.post_id = p.id
  WHERE p.id = ?
  GROUP BY
    p.id`;
  const values = [id];
  return dbPool.execute(query, values);
};

const insertComment = (postId, userId, text) => {
  query = `INSERT INTO comments(post_id, user_id, text) VALUES(?,?,?)`;
  values = [postId, userId, text];

  return dbPool.execute(query, values);
};

const getCommentByPostId = (postId) => {
  query = `
SELECT
	c.id,
	c.text,
	u.username,
	u.img,
	u.job,
	COUNT(IF(cv.type = 'up', 1, null)) as upvote_count,
	COUNT(IF(cv.type = 'down', 1, null)) as downvote_count
FROM
	comments c
	JOIN users u ON u.id = c.user_id
	LEFT JOIN comment_votes cv ON cv.comment_id = c.id
WHERE
  c.post_id = ?
GROUP BY
	c.id;`;
  values = [postId];
  return dbPool.execute(query, values);
};

const voteComment = (commentId, userId, type) => {
  const query = `INSERT INTO comment_votes(comment_id, user_id, type) VALUES(?,?,?)`;
  const values = [commentId, userId, type];
  return dbPool.execute(query, values);
};

const unVoteComment = (commentId, userId, type) => {
  const query = `DELETE FROM comment_votes WHERE comment_id = ? AND user_id = ? AND type = ?`;
  const values = [commentId, userId, type];
  return dbPool.execute(query, values);
};

module.exports = {
  getPosts,
  getPostsBySpaceId,
  getPostById,
  searchPost,
  insertPost,
  getCommentByPostId,
  insertComment,
  voteComment,
  unVoteComment,
};
