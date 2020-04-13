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

//Get all users
  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

//Create a new user
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //Delete a user by id
  app.delete("/api/user/:id", function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

//THIS WAS THE NEWEST CHANGES, WHAT DO I NEED TO KEEP????
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
};