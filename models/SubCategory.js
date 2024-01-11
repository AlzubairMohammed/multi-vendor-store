"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
      SubCategory.hasMany(models.Product, { foreignKey: "sub_category_id" });
      SubCategory.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  SubCategory.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SubCategory",
      timestamps: false,
    }
  );
  return SubCategory;
};
