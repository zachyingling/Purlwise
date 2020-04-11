module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    profilePicUrl: DataTypes.STRING
  },
  {
    timestamps: false
  });
  return User;
};
