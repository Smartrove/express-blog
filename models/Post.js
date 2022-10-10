const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// creating the post model

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
