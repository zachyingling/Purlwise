module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/generate", function(req, res) {
    res.render("generate");
  });

  app.get("/profile", function(req, res) {
    res.render("profile");
  });
  // Load index page (NATHAN'S CODE BEGINS HERE)
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  app.get("/home", function(req, res) {
    var userInfo = req.user.dataValues;
    // console.log('Redirected home');
    // console.log(userInfo);
    res.render("home", {
      user: userInfo
    });
  });

  // app.get("/login", function(req, res) {
  //   res.render("login");
  // });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/generate", function(req, res) {
    var userInfo = req.user.dataValues;
    res.render("generate", {
      user: userInfo
    });
  });

  app.get("/profile", function(req, res) {
    var userInfo = req.user.dataValues;
    res.render("profile", {
      user: userInfo
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  app.get("/error", (req, res) => {
    res.render("error");
  });
};
