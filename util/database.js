const Sequelize = require('sequelize');

const sequelize = new Sequelize('user', 'root', 'node-database', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;