export default (sequelize, DataTypes) => {
  const Upvotes = sequelize.define('Upvotes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Upvotes.associate = (models) => {
    Upvotes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
    });
    Upvotes.belongsTo(models.Recipes, {
      foreignKey: 'userId',
    });
  };
  return Upvotes;
};
