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
  console.log({ values });

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

module.exports = {
  getPosts,
  insertPost,
};
