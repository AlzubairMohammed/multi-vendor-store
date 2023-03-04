const Sequelize = require('sequelize');
module.exports = new Sequelize('e_commerce', 'root', 'noPass123',{
    host:'localhost',
    dialect:'mysql'
});


