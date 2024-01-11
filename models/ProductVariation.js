"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariation extends Model {
    static associate(models) {
      ProductVariation.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductVariation.hasMany(models.Image, {
        foreignKey: "product_variation_id",
      });
    }
  }
  ProductVariation.init(
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
  return ProductVariation;
};
