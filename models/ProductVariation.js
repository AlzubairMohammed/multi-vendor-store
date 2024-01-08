"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Product, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      size: DataTypes.STRING,
      color: DataTypes.STRING,
      material: DataTypes.STRING,
      stock_quantity: DataTypes.INTEGER,
      stock_code: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductVariation",
      timestamps: false,
    }
  );
  return Product;
};
