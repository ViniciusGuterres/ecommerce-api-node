const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const shoppingCart = sequelize.define('shopping_cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        items: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: [],
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: true,
        }
    }, {
        tableName: 'shopping_carts'
    });

    return shoppingCart;
}