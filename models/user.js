//Creates the table that stores user login and profile information ("parent")
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    //fetch from passport
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //fetch from passport
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //create an input form and fetch from there
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //create an input form and fetch from there
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //create an input form and fetch from there
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
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
