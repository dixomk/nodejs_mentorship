module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT(6,2),
    available: DataTypes.BOOLEAN
  });

  Product.associate = function(models) {
    models.Product.hasMany(models.Review);
  };

  return Product;
};