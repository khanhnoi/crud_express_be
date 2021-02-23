const PostMessage = require("../models/postMessage");

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log("postMessages");
    console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  // console.log("post");
  // console.log(post);
  const newPost = new PostMessage(post);
  // console.log(newPost);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
};
