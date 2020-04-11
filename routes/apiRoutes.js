var ravelry = require("../ravelry.js");

module.exports = function(app) {
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
