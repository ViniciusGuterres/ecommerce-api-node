const sequelize = require('../db');
const Product = require('../models/product.js')(sequelize);

class ProductService {
    async createProduct(name, price, description, inventory_amount) {
        const returnObj = { err: null, data: null };

        try {
            const newProduct = await Product.create({
                name,
                price,
                description,
                inventory_amount
            });

            returnObj.data = newProduct;
        } catch (error) {
            returnObj.err = error.message;
        }

        return returnObj;
    }

    async getAllProducts() {
        const returnObj = { err: null, data: null };

        try {
            const products = await Product.findAll();

            returnObj.data = products;
        } catch (error) {
            returnObj.err = error.message;
        }

        return returnObj;
    }

    async updateProduct(productId, productData) {
        const returnObj = { err: null, data: null };

        try {
            const updatedProduct = await Product.update(productData, {
                where: { id: productId },
                returning: true,
                plain: true,
            });

            if (!updatedProduct[1]) {
                returnObj.err = 'Product not found';
            } else {
                returnObj.data = updatedProduct[1];
            }
        } catch (error) {
            returnObj.err = error.message;
        }

        return returnObj;
    }

    async deleteProduct(productId) {
        const returnObj = { err: null };

        try {
            const result = await Product.destroy({ where: { id: productId } });

            if (!result) {
                returnObj.err = 'Product not found';
            }
        } catch (error) {
            returnObj.err = error.message;
        }

        return returnObj;
    }
}

module.exports = ProductService;