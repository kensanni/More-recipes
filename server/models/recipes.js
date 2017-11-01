export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please input your recipe name'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please Input a description for your recipes'
      }
    },
    upvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please input a image for your recipes'
      }
    },
    indegrient: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please input the required indegrient for your recipes'
      }
    }
  });
  Recipes.associate = (models) => {
    Recipes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Recipes;
};
