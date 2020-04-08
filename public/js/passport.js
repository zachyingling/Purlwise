var passport = require("passport"),
  GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "1a0c9a6167a639262425",
      clientSecret: "ceabf4a109a5e27f9327c78c04a74e515f443737",
      callbackURL: "http://localhost:3000/auth/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

module.exports = passport;
