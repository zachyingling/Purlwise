var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var Pattern = require("../models/user.js");

// Create all our routes and set up logic within those routes where required.
router.get("/api/signup", function(req, res) {
  User.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/patterns", function(req, res) {
  Pattern.create(["name", "sleepy"], [req.body.name, req.body.sleepy], function(
    result
  ) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// Export routes for server.js to use.
module.exports = router;
