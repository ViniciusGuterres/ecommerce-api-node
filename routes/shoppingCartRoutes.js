const { verifyToken } = require('../auth.js');

const ShoppingCartController = require('../controllers/shoppingCartController');
const ShoppingCartService = require('../services/shoppingCartService.js');

const shoppingCartService = new ShoppingCartService();
const shoppingCartController = new ShoppingCartController(shoppingCartService);

module.exports = app => {
    app.post('/shoppingCarts', verifyToken, shoppingCartController.addItemToCart);
    app.get('/shoppingCarts', verifyToken, shoppingCartController.getCart);
    app.delete('/shoppingCarts/:id', verifyToken, shoppingCartController.removeItemFromCart);    
}