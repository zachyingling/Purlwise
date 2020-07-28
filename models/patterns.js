//Creates the table that stores the patterns within the collections ("child").

module.exports = function(sequelize, DataTypes) {
  var Pattern = sequelize.define("Pattern", {
    patternId: {
      type: DataTypes.INTEGER
    },
    //must fetch from the API
    patternName: {
      type: DataTypes.STRING
    },
    patternAuthor: {
      type: DataTypes.STRING
    },
    //must fetch from the API
    patternUrl: {
      type: DataTypes.STRING,
      isUrl: true
    },
    patternImage: {
      type: DataTypes.STRING,
      isUrl: true
    }
  });

  //hasMany refers to the one or many children this table (model) can have
  Pattern.associate = function(models) {
    Pattern.belongsTo(models.User);
  };
  return Pattern;
};
