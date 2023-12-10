const config = require("../config/env");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    tel: {
      type: Sequelize.STRING(13),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    c: {
      type: Sequelize.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    u: {
      type: Sequelize.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    d: {
      type: Sequelize.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: config,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

User.associate = ({ Product }) => {
  User.hasMany(Product, {
    foreignKey: "user_id",
    as: "products",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = User;
