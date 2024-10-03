const { verifyToken } = require('../auth.js');

const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService();
const productController = new ProductController(productService);

module.exports = app => {
    app.post('/products', verifyToken, productController.createProduct);
    app.get('/products', verifyToken, productController.getAllProducts);
    app.put('/products/:id', verifyToken, productController.updateProduct);
    app.delete('/products/:id', verifyToken, productController.deleteProduct);
}