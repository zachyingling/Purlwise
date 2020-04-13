module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    //fetch from passport
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    uid: {
      type: DataTypes.STRING
    },
    profilePicUrl: {
     type: DataTypes.STRING
    },
    //fetch from passport
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  //hasMany refers to the one or many children this table (model) can have
  User.associate = function(models) {
    User.hasMany(models.Collection, {
      //if you delete a User this will delete the collections with the user
      onDelete: "cascade"
    });
  };
  return User;
};
