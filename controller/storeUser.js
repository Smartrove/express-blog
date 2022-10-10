const User = require("../models/User");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      console.log(error);
      const registrationErrors = Object.keys({ error: error.errors }).map(
        (key) => error.errors[key].message
      );

      // req.session.registrationErrors = registrationErrors;
      req.flash("registrationErrors", registrationErrors);
      req.flash("data", req.body);
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  });
};
