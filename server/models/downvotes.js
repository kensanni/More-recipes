export default (sequelize, DataTypes) => {
  const Downvotes = sequelize.define('Downvotes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Downvotes.associate = (models) => {
    Downvotes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
    });
    Downvotes.belongsTo(models.Recipes, {
      foreignKey: 'userId',
    });
  };
  return Downvotes;
};
