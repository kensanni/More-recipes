export default (sequelize, DataTypes) => {
  const Downvotes = sequelize.define('Downvotes', {
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
  Downvotes.associate = (models) => {
    Downvotes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
    });
    Downvotes.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Downvotes;
};
