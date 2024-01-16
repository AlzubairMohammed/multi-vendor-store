"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariation extends Model {
    static associate(models) {
      ProductVariation.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductVariation.belongsTo(models.Attribute, {
        foreignKey: "attribute_id",
      });
      ProductVariation.hasMany(models.Image, {
        foreignKey: "product_variation_id",
      });
    }
  }
  ProductVariation.init(
    {
      product_id: DataTypes.INTEGER,
      attribute_id: DataTypes.INTEGER,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductVariation",
      timestamps: false,
    }
  );
  return ProductVariation;
};
