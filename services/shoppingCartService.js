const sequelize = require('../db');
const ShoppingCart = require('../models/shoppingCart.js')(sequelize);

class ShoppingCartService {
    constructor() { }

    async addItemToCart(userId, product) {
        try {
            let cart = await ShoppingCart.findOne({ where: { user_id: userId } });

            if (!cart) {
                cart = await ShoppingCart.create({
                    user_id: userId,
                    items: [product],
                    price: product.price,
                });
            } else {
                const updatedItems = [...cart.items, product];
                const updatedPrice = cart.price + product.price;

                await cart.update({
                    items: updatedItems,
                    price: updatedPrice,
                });
            }

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async removeItemFromCart(userId, productId) {
        try {
            const cart = await ShoppingCart.findOne({ where: { user_id: userId } });

            if (!cart) {
                throw new Error('Cart not found for this user');
            }

            const updatedItems = cart.items.filter(item => item.id !== productId);
            const productToRemove = cart.items.find(item => item.id === productId);
            const updatedPrice = cart.price - (productToRemove ? productToRemove.price : 0);

            await cart.update({
                items: updatedItems,
                price: updatedPrice,
            });

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getCart(userId) {
        // try {
            const cart = await ShoppingCart.findOne({ where: { user_id: userId } });

            if (!cart) {
                throw new Error('Cart not found for this user');
            }

            return cart;
        // } catch (error) {
        //     throw error;
        // }
    }
}

module.exports = ShoppingCartService;