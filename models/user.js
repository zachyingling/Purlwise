module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      uid: DataTypes.STRING,
      profilePicUrl: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Collection, {
      //if you delete a User this will delete the collections with the user
      onDelete: "cascade"
    });
  };
  return User;
};
