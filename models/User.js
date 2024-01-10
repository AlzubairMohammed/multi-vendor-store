"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      phone: DataTypes.STRING,
      token: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
