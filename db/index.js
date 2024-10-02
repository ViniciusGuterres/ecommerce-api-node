const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

// Initialize Sequelize instance with your database credentials
const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
    host: '127.0.0.1',
    dialect: 'postgres', // Change 'sqlite' to your preferred dialect, like 'postgres', 'mysql', etc.
    // "username": "postgres",
    // "password": "admin",
    // "database": "ecommerce",
});

// Import and initialize models
const User = require('../models/user')(sequelize);
const ShoppingCart = require('../models/shoppingCart')(sequelize);
const PaymentTransaction = require('../models/paymentTransaction')(sequelize);
const Product = require('../models/product')(sequelize);

// Define relations
User.hasMany(PaymentTransaction, { foreignKey: 'userId' });
PaymentTransaction.belongsTo(User, { foreignKey: 'userId' });

ShoppingCart.hasMany(PaymentTransaction, { foreignKey: 'cartId' });
PaymentTransaction.belongsTo(ShoppingCart, { foreignKey: 'cartId' });

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('DB connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing models:', err);
    });

module.exports = sequelize;