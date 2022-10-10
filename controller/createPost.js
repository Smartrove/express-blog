module.exports = (req, res) => {
  if (req.session.userId) {
    return res.render("newpost");
  } else {
    res.redirect("/auth/login");
  }
};
