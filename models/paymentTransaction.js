const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const paymentTransaction = sequelize.define('payment_transaction', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        totalAmount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'pending',
            validate: {
                isIn: [['pending', 'completed', 'failed']],
            }
        },
        cartId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'shopping_carts',
                key: 'id',
            }
        }
    }, {
        tableName: 'payment_transactions'
    });

    return paymentTransaction;
}