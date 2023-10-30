const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Product extends Model {};
Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    sub_section_id: {
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:'SubCategory',
        key:'id'
      }
    }

  },
  {
    sequelize,
    modelName: "Product",
    freezeTableName: true,
    tableName: "products",
    timestamps: false,
  }
);

Product.associate = ({Image})=>{
  Product.hasMany(Image, {
      foreignKey:'product_id',
      as:'images',
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
  });
}

module.exports = Product;
