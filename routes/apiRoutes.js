var db = require("../models");
var ravelry = require("../ravelry.js");
var passport = require("../public/js/passport");

module.exports = function(app) {
  //Zach's route
  app.get("/api/patterns", function(req, res) {
    ravelry(
      req.query.knitOrCrotchet,
      req.query.yarnWeight,
      req.query.articleOfClothing,
      function(data) {
        res.json(data);
      }
    );
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // //Save username and password
  // app.post("/api/");
  //Save a pattern
  app.post("/api/patterns", function(req, res) {
    var patternId = req.query.patternId;
    var patternUrl = req.query.patternUrl;
    var patternName = req.query.patternName;
    db.Pattern.create({
      patternUrl: patternUrl,
      patternName: patternName,
      patternId: patternId
    }).then(function(results) {
      res.json(results);
    });
  });
  //Nathan's routes do not delete
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
      failureRedirect: "/login"
    }),
    function(req, res) {
      // Successful authentication
      res.redirect("/home");
    }
  );
};
