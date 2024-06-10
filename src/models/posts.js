const dbPool = require("../config/database");

const getPosts = () => {
  const query = `
  SELECT
    *,
    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comment_count
  FROM 
    posts p
  JOIN
    users u ON u.id = p.user_id
  GROUP BY
    P.id`;

  return dbPool.execute(query);
};

const searchPost = (keyword) => {
  const query = `
    SELECT
        p.id,
        p.title,
        p.type
        u.img "author_image"
    FROM
        posts p
    JOIN
        users u ON u.id = p.user_id
    WHERE posts.title LIKE %?%`;
  const values = [keyword];

  return dbPool.execute(query, values);
};

const insertPost = (
  spaceId,
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
    u.img "author_image"  
  FROM
    posts p
  JOIN
    users u ON u.id = p.user_id
  WHERE p.id = ?`;
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
    p.id,
    p.text,
    u.username,
    u.img,
    u.job
  FROM
    comments c
  JOIN
    users u ON u.id = c.user_id
  JOIN
    comment_votes cv ON cv.post_id = p.id
  WHERE c.post_id = ?
  GROUP BY
    p.id`;
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
  insertPost,
  getCommentByPostId,
  insertComment,
  voteComment,
  unVoteComment,
};
