"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.SubCategory, { foreignKey: "sub_category_id" });
      Product.belongsTo(models.User, { foreignKey: "user_id" });
      Product.hasMany(models.Image);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      qty: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      sub_category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false,
    }
  );
  return Product;
};
