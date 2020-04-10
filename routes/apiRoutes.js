//var db = require("../models");

var passport = require("../public/js/passport");

module.exports = function(app) {
  app.all("/auth/github", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://github.com");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  app.all("/auth/callback", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://github.com");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["read:user", "user:email"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
      successRedirect: "/home",
      failureRedirect: "/login"
    }),
    function(req, res) {
      // Successful authentication
      res.json(req.user);
    }
  );
};
