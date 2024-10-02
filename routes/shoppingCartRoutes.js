const bodyParser = require('body-parser');

const ShoppingCartController = require('../controllers/shoppingCartController');
const ShoppingCartService = require('../services/shoppingCartService.js');

const shoppingCartService = new ShoppingCartService();
const shoppingCartController = new ShoppingCartController(shoppingCartService);

module.exports = app => {
    app.post('/shoppingCarts', bodyParser.json(), shoppingCartController.addItemToCart);
    app.get('/shoppingCarts', bodyParser.json(), shoppingCartController.getCart);
    app.delete('/shoppingCarts/:id', bodyParser.json(), shoppingCartController.removeItemFromCart);    
}