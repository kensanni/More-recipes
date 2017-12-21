export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    }
  });
  Favorites.associate = (models) => {
    Favorites.belongsTo(models.Recipes, {
      foreignKey: 'recipeId'
    });
    Favorites.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Favorites;
};
