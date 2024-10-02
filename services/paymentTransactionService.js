const sequelize = require('../db');
const User = require('../models/user')(sequelize);
const ShoppingCart = require('../models/shoppingCart')(sequelize);
const PaymentTransaction = require('../models/paymentTransaction')(sequelize);

class PaymentTransactionService {
    constructor() {}

    async processCreditCardPayment(userId, cartId, totalAmount) {
        try {
            const user = await User.findByPk(userId);
            const cart = await ShoppingCart.findByPk(cartId);

            if (!user || !cart) {
                throw new Error('User or cart not found');
            }

            const transaction = await PaymentTransaction.create({
                userId,
                cartId,
                totalAmount,
                status: 'completed',
            });

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async processPixPayment(userId, cartId, totalAmount) {
        try {
            const user = await User.findByPk(userId);
            const cart = await ShoppingCart.findByPk(cartId);

            if (!user || !cart) {
                throw new Error('User or cart not found');
            }

            const transaction = await PaymentTransaction.create({
                userId,
                cartId,
                totalAmount,
                status: 'completed', 
            });

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionStatus(transactionId) {
        try {
            const transaction = await PaymentTransaction.findByPk(transactionId);

            if (!transaction) {
                throw new Error('Transaction not found');
            }

            return transaction;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentTransactionService;