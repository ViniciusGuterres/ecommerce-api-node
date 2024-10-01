const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', // or 'postgres', 'sqlite', 'mariadb', etc.
});

sequelize.authenticate()
    .then(() => {
        console.log('DB connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;