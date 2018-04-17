'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Upvotes = sequelize.define('Upvotes', {
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
  Upvotes.associate = function (models) {
    Upvotes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId'
    });
    Upvotes.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Upvotes;
};