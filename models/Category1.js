const config = require("../config/env");
const Sequelize = require("sequelize");

const Model = Sequelize.Model;

class Category extends Model {}
Category.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
      ç,
    },
    updated: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: config,
    modelName: "Category",
    freezeTableName: true,
    tableName: "sections",
    timestamps: false,
  }
);

Category.associate = ({ SubCategory }) => {
  Category.hasMany(SubCategory, {
    foreignKey: "sections_id",
    as: "sub_sections",
    onDelete: "CASCATE",
    onUpdate: "CASCATE",
  });
};

module.exports = Category;
