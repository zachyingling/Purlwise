module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // fetch from passport
    username: {
      type: DataTypes.STRING
    },
    uid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    profilePicUrl: {
      type: DataTypes.STRING,
      isUrl: true
    },
    //fetch from passport
    password: {
      type: DataTypes.STRING,
      defaultValue: "password"
    }
  });

  //hasMany refers to the one or many children this table (model) can have
  User.associate = function(models) {
    User.hasOne(models.Collection, { foreignKey: "userId" });
    // User.hasMany(models.Pattern, {
    //   //if you delete a User this will delete the collections with the user
    //   // onDelete: "cascade"
    // });
  };
  return User;
};
