//Creates the table that stores the patterns within the collections ("child").

module.exports = function (sequelize, DataTypes) {
  var Pattern = sequelize.define("Pattern", {
    patternId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    //must fetch from the API
    patternName: {
      type: DataTypes.STRING
    },
    //must fetch from the API
    patternUrl: {
      type: DataTypes.STRING
    }
  });

  //belongsTo means this is the child of the parent (collection)
  Pattern.associate = function (models) {
    Pattern.belongsTo(models.Collection, {
      onDelete: "cascade",
      foreignKey: {
        //won't allow you to create an entry in the collections without also having a user id value "prevents orphaning a row"
        allowNull: false
      }
    });
  };
  return Pattern;
};
