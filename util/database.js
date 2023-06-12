const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-demo','root','Ayan1234!@#', {
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;
