'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a username'
      },
      unique: {
        args: true,
        msg: 'Username already exists'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a username'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: function isNotShort(value) {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        }
      }
    },
    profileImage: DataTypes.STRING
  });
  Users.associate = function (models) {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId',
      as: 'recipes'
    });
    Users.hasMany(models.Reviews, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Favorites, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Upvotes, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Downvotes, {
      foreignKey: 'userId'
    });
  };
  return Users;
};