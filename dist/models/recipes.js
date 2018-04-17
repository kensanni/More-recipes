'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please input your recipe name'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Please Input a description for your recipes'
      }
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please input the required ingredient for your recipes'
      }
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please input a image for your recipes'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    }
  });
  Recipes.associate = function (models) {
    Recipes.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
    Recipes.hasMany(models.Favorites, {
      foreignKey: 'recipeId'
    });
    Recipes.hasMany(models.Reviews, {
      foreignKey: 'recipeId'
    });
    Recipes.hasMany(models.Upvotes, {
      foreignKey: 'recipeId'
    });
    Recipes.hasMany(models.Downvotes, {
      foreignKey: 'recipeId'
    });
  };
  return Recipes;
};