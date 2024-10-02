const bodyParser = require('body-parser');

const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService();
const product = new ProductController(productService);

module.exports = app => {
    app.post('/products', bodyParser.json(), product.createProduct);
    app.get('/products', bodyParser.json(), product.getAllProducts);
    app.put('/products/:id', bodyParser.json(), product.updateProduct);
    app.delete('/products/:id', bodyParser.json(), product.deleteProduct);
}