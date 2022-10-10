const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User");
module.exports = async (req, res) => {
  // const { email, password } = req.body;
  //when a user login what do we want to see??
  // 1. try to find the user whether he is registered or not
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    req.session.userId = user._id;
    res.redirect("/");
  } else {
    res.redirect("/auth/login");
  }
};
