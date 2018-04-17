'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Favorites = sequelize.define('Favorites', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId'
      }
    }
  });
  Favorites.associate = function (models) {
    Favorites.belongsTo(models.Recipes, {
      foreignKey: 'recipeId'
    });
    Favorites.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Favorites;
};