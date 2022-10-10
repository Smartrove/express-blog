const path = require("path");
const Post = require("../models/Post");

module.exports = async (req, res) => {
  const { image } = await req.files;
  image.mv(
    path.resolve(__dirname, "..", "public/images", image.name),
    (error) => {
      Post.create(
        {
          ...req.body,
          image: `images/${image.name}`,
          author: req.session.userId,
        },
        (error, post) => {
          // console.log("ola", post);
          res.redirect("/");
        }
      );
    }
  );
};
