//Creates the table that stores user collections and the patterns therein ("child")
module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define("Collection", {
    nameOfCollection: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patternId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

//belongsTo means this is the child of the parent 
  Collection.associate = function(models) {
    Collection.belongsTo(models.User, {
      foreignKey: {
//won't allow you to create an entry in the collections without also having a user id value "prevents orphaning a row"
        allowNull: false
      },
      onDelete: "cascade"
    });
//this defines the patterns table as the child of the collections table
    Collection.hasMany(models.Pattern, {
//if you delete a User this will delete the collections with the user
      onDelete: "cascade"
    });
  };
  return Collection;
};


//On the click of the create a new collection button, zach will do an ajax call to post the information (including the name of the collection), which will create a route (write the logic to respond to this call in the apiRoutes.js) within the route do a collection.create to create a new collections record. Will need to know the User ID and the name of the collection that you're trying to create (fetch from the input form that the user creates) tell zach that you need an input form in handlebars

//I would write the update or create statement in apiRoutes.js. When a post to this route is executed I want to do collection.create and take the colection name and the user ID and create a new row in the table

// Zach would write the jquery that reacts to the submit button in the handlebars files, ajax post method
