const PostModel = require("../models/posts");

const getPosts = async (req, res) => {
  try {
    const [posts] = await PostModel.getPosts();
    posts.map((post) => ({
      title: post.title,
      description: post.description,
      space_id: post.space_id,
      type: post.type,
      img: post.img,
      created_at: post.created_at,
      comment_count: post.comment_count,
      author: {
        username: post.author_username,
        img: post.author_image,
        job: post.author_job,
      },
    }));

    res.status(200).json({
      posts,
      message: "sukses mendapatkan data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const createPost = async (req, res) => {
  const { title, description, type, img, space_id } = req.body;
  try {
    const [result] = await PostModel.insertPost(
      space_id,
      req.userId,
      type,
      title,
      description,
      img
    );

    return res.status(201).json({
      message: "sukses membuat post",
      data: {
        post: {
          id: result.insertId,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const searchPost = async (req, res) => {
  const { q: keyword } = req.query;
  try {
    const [posts] = await PostModel.searchPost(keyword);
    return res.json({
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const [result] = await PostModel.getPostById(postId);
    if (!result || result[0].user_id !== req.userId) {
      return res.status(404).json({ message: "post tidak ditemukan" });
    }
    const post = {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      type: result[0].type,
      img: result[0].img,
      space_id: result[0].space_id,
      created_at: result[0].created_at,
      comment_count: result[0].comment_count,
      author: {
        name: result[0].username,
        img: result[0].author_image,
        job: result[0].job,
      },
    };

    return res.json({
      data: {
        post,
      },
      message: "sukses mendapatkan data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const createComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  try {
    await PostModel.insertComment(postId, req.userId, text);

    return res.status(201).json({
      message: "sukses menambahkan komentar",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const getCommentByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const [result] = await PostModel.getCommentByPostId(postId);
    const comments = result.map((comment) => ({
      id: comment.id,
      text: comment.text,
      user: {
        name: comment.username,
        img: comment.img,
        job: comment.job,
      },
      vote: {
        up: comment.upvote_count,
        down: comment.downvote_count,
      },
    }));
    return res.status(200).json({
      message: "sukses mendapatkan komentar",
      data: {
        comments,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const voteComment = async (req, res) => {
  const { commentId } = req.params;
  const { type } = req.body;

  try {
    await PostModel.voteComment(commentId, req.userId, type);
    return res.status(201).json({
      message: "sukses memberikan vote",
    });
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case "ER_DUP_ENTRY":
        return res.status(422).json({
          message: "anda sudah memberikan vote",
        });
      default:
        return res.json({
          message: "server error",
        });
    }
  }
};

const unVoteComment = async (req, res) => {
  const { commentId } = req.params;
  const { type } = req.body;

  try {
    await PostModel.unVoteComment(commentId, req.userId, type);
    return res.status(201).json({
      message: "sukses membatalkan vote",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "server error",
    });
  }
};

module.exports = {
  getPosts,
  searchPost,
  getPostById,
  createPost,
  createComment,
  getCommentByPostId,
  voteComment,
  unVoteComment,
};
