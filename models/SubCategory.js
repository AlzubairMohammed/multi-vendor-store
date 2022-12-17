const config = require('../config/env');
const Sequelize = require('sequelize');
const Product = require('./Product');
const Model = Sequelize.Model;

class SubCategory extends Model {};
SubCategory.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    sections_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: "Category",
            key: "id",
          },
    },
    createdAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    sequelize:config,
    modelName: "SubCategory",
    freezeTableName: true,
    tableName: "sub_sections",
    timestamps: false,
});

SubCategory.associate = ({Product})=>{
    SubCategory.hasMany(Product, {
        foreignKey:'sub_section_id',
        as:'product'
    })
}

module.exports = SubCategory;