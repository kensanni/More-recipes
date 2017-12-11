export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
