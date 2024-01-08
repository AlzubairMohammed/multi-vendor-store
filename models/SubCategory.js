"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
