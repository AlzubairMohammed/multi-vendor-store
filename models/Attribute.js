"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    static associate(models) {
      Attribute.hasMany(models.ProductVariation, {
        foreignKey: "attribute_id",
      });
    }
  }
  Attribute.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Attribute",
      timestamps: false,
    }
  );
  return Attribute;
};
