export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a username',
      },
      unique: {
        args: true,
        msg: 'Username already exists'
      },
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
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      },
    },
    profileImage: DataTypes.STRING,
  });
  Users.associate = (models) => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId',
      as: 'recipes',
    });
    Users.hasMany(models.Reviews, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Favorites, {
      foreignKey: 'userId',
    });
  };
  return Users;
};
