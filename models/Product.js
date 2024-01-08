"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.SubCategory, { foreignKey: "sub_category_id" });
      // Product.belongsTo(models.User, { foreignKey: "user_id" });
      Product.hasMany(models.Image, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      base_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false,
    }
  );
  return Product;
};
