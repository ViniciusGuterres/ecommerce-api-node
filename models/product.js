const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        inventory_amount: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'products'
    });

    return Product;
}