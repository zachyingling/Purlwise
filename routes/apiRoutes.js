var db = require("../models");
// var passport = require("..config/passport");

//Zach's API
var ravelry = require("../ravelry.js");

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
  // Get all collection
  app.get("/api/collection", function(req, res) {
    db.Collection.findAll({}).then(function(dbCollection) {
      res.json(dbCollection);
    });
  });
//Get all patterns
  app.get("/api/pattern", function(req, res) {
    db.Pattern.findAll({}).then(function(dbPattern) {
      res.json(dbPattern);
    });
  });

//Create a new user
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // Create a new collection
  app.post("/api/collection", function(req, res) {
    db.Collection.create(req.body).then(function(dbCollection) {
      res.json(dbCollection);
    });
  });
//Create a new pattern
  app.post("/api/pattern", function(req, res) {
    db.Pattern.create(req.body).then(function(dbPattern) {
      res.json(dbPattern);
    });
  });

//Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(
      dbUser
    ) {
      res.json(dbUser);
    });
  });

  // Delete an collection by id
  app.delete("/api/collection/:id", function(req, res) {
    db.Collection.destroy({ where: { id: req.params.id } }).then(function(
      dbCollection
    ) {
      res.json(dbCollection);
    });
  });

//Delete a pattern by id
  app.delete("/api/pattern/:id", function(req, res) {
    db.Pattern.destroy({ where: { id: req.params.id } }).then(function(
      dbPattern
    ) {
      res.json(dbPattern);
    });
  });
};
