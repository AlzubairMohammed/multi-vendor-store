"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.SubCategory, { foreignKey: "category_id" });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
      timestamps: false,
    }
  );
  return Category;
};
