//var db = require("../models");

var passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get(
    "/auth/callback",
    passport.authenticate("github", { failureRedirect: "/login" }, function(
      req,
      res
    ) {
      res.redirect("/home");
    })
  );
};
