var passport = require("passport"),
  GitHubStrategy = require("passport-github2").Strategy;
var db =  require("../../models");

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
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      var gitUserName = profile.username;
      var gitProPic = profile.photos[0].value;
      db.User.findOrCreate({
        where: { username: gitUserName },
        defaults: { profilePicUrl: gitProPic }
      }).then(([user, created]) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
        return done(null, profile);
      }).error(function(err){
        console.log('Error occured' + err);
      });
    }
  )
);

module.exports = passport;
