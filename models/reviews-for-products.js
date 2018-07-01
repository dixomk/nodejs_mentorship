module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    productId: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Review.associate = function (models) {
    models.Review.belongsTo(models.Product, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Review;
};