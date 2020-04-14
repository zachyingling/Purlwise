module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    //fetch from passport
    username: {
      type: DataTypes.STRING
    },
    //fetch from passport
    password: {
      type: DataTypes.STRING,
      defaultValue: "password"
    },
    profilePicUrl: {
      type: DataTypes.STRING,
      isUrl: true
    }
  });
  //hasOne refers to the one or many children this table (model) can have
  User.associate = function(models) {
    User.hasOne(models.Pattern);
  };
  return User;
};
