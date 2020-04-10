//Creates the table that stores the patterns within the collections ("child")
module.exports = function(sequelize, DataTypes) {
  var Pattern = sequelize.define("Pattern", { 
//must fetch from the API
    patternId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
//must fetch from the API
    patternUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
//belongsTo means this is the child of the parent (collection)
  Pattern.associate = function(models) {
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
