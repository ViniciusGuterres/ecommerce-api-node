const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the connection

const User = sequelize.define('User', {
    // Define attributes of the model
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    // Model options
    tableName: 'users', // Customize table name if different from model name
});

module.exports = User;