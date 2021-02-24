const mongoose = require("mongoose");
const PostMessage = require("../models/postMessage");

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    // console.log("postMessages");
    // console.log(postMessages);

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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  // const newPost = new PostMessage(post);

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that Id !!");

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that Id");

    const updatedPost = await PostMessage.findByIdAndRemove(id);
    res.status(200).json("Delete Post Success !!");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that Id");

    const post = await PostMessage.findById(id);
    const numberLikeCurrent = post.likeCount;
    const updatePost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: numberLikeCurrent + 1,
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
