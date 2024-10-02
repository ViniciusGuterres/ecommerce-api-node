const bodyParser = require('body-parser');

const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService();
const productController = new ProductController(productService);

module.exports = app => {
    app.post('/products', bodyParser.json(), productController.createProduct);
    app.get('/products', bodyParser.json(), productController.getAllProducts);
    app.put('/products/:id', bodyParser.json(), productController.updateProduct);
    app.delete('/products/:id', bodyParser.json(), productController.deleteProduct);
}