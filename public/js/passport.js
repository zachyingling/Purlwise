/* eslint-disable no-unused-vars */
var passport = require("passport"),
  GitHubStrategy = require("passport-github2").Strategy;
var db = require("../../models");
var uid = "";

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  db.User.findOne({
    where: {
      uid: id
    }
  })
    .then(user => {
      // console.log(user);
      done(null, user);
    })
    .catch(err => {
      console.error(err);
      done(err);
    });
  // done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "1a0c9a6167a639262425",
      clientSecret: "ceabf4a109a5e27f9327c78c04a74e515f443737",
      callbackURL: "/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      var gitUserName = profile.username;
      var gitProPic = profile.photos[0].value;
      db.User.findOrCreate({
        where: { username: gitUserName },
        defaults: { uid: profile.id, profilePicUrl: gitProPic }
      })
        .then(([user, created]) => {
          uid = user.uid;
          // console.log(user.get({
          //   plain: true
          // }))
          // console.log(created)
          return done(null, profile);
        })
        .error(function(err) {
          console.log("Error occured" + err);
        });
    }
  )
);

module.exports = {
  passport: passport,
  uid: uid
};
