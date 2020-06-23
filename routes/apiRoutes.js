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

  //Save user login
  //Save a pattern
  app.post("/api/patterns", function(req, res) {
    var patternId = req.body.id;
    var patternName = req.body.name;
    var patternUrl = req.body.url;
    var UserUid = req.user.dataValues.uid;

    db.Pattern.findOne({ where: { patternId: patternId, UserUid: UserUid } })
      .then(response => {
        if (!response) {
          db.Pattern.create({
            patternId: patternId,
            patternName: patternName,
            patternUrl: patternUrl,
            UserUid: UserUid
          })
            .then(function() {
              res.send({ saved: "done" });
            })
            .catch(() => {
              res.send({ saved: "error" });
            });
        } else {
          res.send({ saved: "already" });
        }
      })
      .catch(() => {
        res.send({ saved: "error" });
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
    passport.passport.authenticate("github", {
      scope: ["read:user", "user:email"]
    })
  );

  app.get(
    "/auth/github/callback",
    passport.passport.authenticate("github", {
      failureRedirect: "/login"
    }),
    function(req, res) {
      // Successful authentication
      res.redirect("/home");
    }
  );
};
