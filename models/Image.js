const config = require("../config/env");
const Sequelize = require("sequelize");

const Model = Sequelize.Model;

class Image extends Model {}
Image.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Product",
        key: "id",
      },
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
    modelName: "Image",
    freezeTableName: true,
    tableName: "images",
    timestamps: false,
  }
);

module.exports = Image;
