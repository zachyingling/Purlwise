var passport = require("passport");

var GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: "1a0c9a6167a639262425",
      clientSecret: "ceabf4a109a5e27f9327c78c04a74e515f443737",
      callbackURL: "http://localhost/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ githubId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

module.exports = passport;
