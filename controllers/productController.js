
class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }

    sendResponse(res, statusCode, returnObj) {
        return res.status(statusCode).json(returnObj);
    }

    createProduct = async (req, res) => {
        const returnObj = { statusCode: 201, err: null, data: null };

        // Req.body validations
        if (!req.body || !Object.values(req.body)?.length) {
            returnObj.statusCode = 400;
            returnObj.err = 'No body received or body empty';

            console.log(`controllers/product.createProduct - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { name, price, description, inventory_amount } = req.body;

        if (!name || typeof name !== 'string') {
            returnObj.statusCode = 400;
            returnObj.err = 'name not received or wrong format';

            console.log(`controllers/product.createProduct - ${returnObj.err}`);
            return this.sendResponse(res, returnObj.statusCode, returnObj);
        }

        if (!price || !parseFloat(price)) {
            returnObj.statusCode = 400;
            returnObj.err = 'price not received or wrong format';

            console.log(`controllers/product.createProduct - ${returnObj.err}`);
            return this.sendResponse(res, returnObj.statusCode, returnObj);
        }

        if (inventory_amount && !parseInt(inventory_amount)) {
            returnObj.statusCode = 400;
            returnObj.err = 'inventory_amount wrong format';

            console.log(`controllers/product.createProduct - ${returnObj.err}`);
            return this.sendResponse(res, returnObj.statusCode, returnObj);
        }

        const { err, data } = await this.productService.createProduct(name, price, description, inventory_amount);

        if (err) {
            returnObj.statusCode = 500;
            returnObj.err = err;
        } else {
            returnObj.data = data;
        }

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }

    getAllProducts = async (req, res) => {
        const returnObj = { statusCode: 200, err: null, data: null };

        try {
            const products = await this.productService.getAllProducts();

            returnObj.data = products;
        } catch (error) {
            console.log(`controllers/product.getAllProducts - ${error}`);
            returnObj.err = 'Failed to fetch products';
            returnObj.statusCode = 500;
        }

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }

    updateProduct = async (req, res) => {
        const returnObj = { statusCode: 200, err: null, data: null };

        // Req.body validations
        if (!req.body || !Object.values(req.body)?.length) {
            returnObj.statusCode = 400;
            returnObj.err = 'No body received or body empty';

            console.log(`controllers/product.updateProduct - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { name, price, description, inventory_amount } = req.body;

        const productData = { name, price, description, inventory_amount };

        if (!name && !price && !description && !inventory_amount) {
            returnObj.statusCode = 400;
            returnObj.err = 'No changes found';

            console.log(`controllers/product.updateProduct - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        if (!req.params.id) {
            returnObj.statusCode = 400;
            returnObj.err = 'No req.params.id received';

            console.log(`controllers/product.updateProduct - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { id } = req.params;

        const { err, data } = await this.productService.updateProduct(id, productData);

        if (err) {
            returnObj.statusCode = 404;
            returnObj.err = err;
        } else {
            returnObj.data = data;
        }

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }

    deleteProduct = async (req, res) => {
        const returnObj = { statusCode: 200, err: null };
        
        const { id } = req.params;

        if (!id) {
            returnObj.statusCode = 400;
            returnObj.err = 'No id received';

            console.log(`controllers/product.updateProduct - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { err } = await this.productService.deleteProduct(id);

        if (err) {
            returnObj.statusCode = 404;
            returnObj.err = err;
        }

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }
}

module.exports = ProductController;