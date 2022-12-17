const Sequelize = require('sequelize');
module.exports = new Sequelize('e_commerce', 'root', '',{
    host:'localhost',
    dialect:'mysql'
});


