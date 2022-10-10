const mongoose = require("mongoose");

const Post = require("./models/Post");

//connecting to the database
const connection = mongoose.connect(
  "mongodb+srv://smartrove:Abuaishah@cluster0.u8amhjj.mongodb.net/blog_db",
  () => {
    if (connection) {
      console.log("database connected successfully");
    }
  }
);

// // reading post from the database
// Post.find({}, (error, posts) => {
//   console.log(error, posts);
// });

// finding one post
Post.findById("63388669cc2c5dc8d97e53d4", (error, post) => {
  console.log(error, post);
});

//updating post

// Post.findByIdAndUpdate(
//   "63388669cc2c5dc8d97e53d4",
//   {
//     title: "blog like a professional",
//     description: "with a great content",
//     content: "blogging made easy",
//   },
//   (error, post) => {
//     console.log(error, post);
//   }
// );

//to create post

// Post.create(
//   {
//     title: "My second blog post",
//     description: "second Blog Post Description",
//     content: "second lorem ipsum content",
//   },
//   (error, post) => {
//     console.log(error, post);
//   }
// );
