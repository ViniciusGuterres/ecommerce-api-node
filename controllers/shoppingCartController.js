class ShoppingCartController {
    constructor(shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    sendResponse(res, statusCode, returnObj) {
        return res.status(statusCode).json(returnObj);
    }

    addItemToCart = async (req, res) => {
        const returnObj = { statusCode: 201, err: null, data: null };

        // Req.body validations
        if (!req.body || !Object.values(req.body)?.length) {
            returnObj.statusCode = 400;
            returnObj.err = 'No body received or body empty';

            console.log(`controllers/shoppingCartController.addItemToCart - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { userId, product } = req.body;

        if (!userId || !product) {
            returnObj.statusCode = 400;
            returnObj.err = 'userId and product data are required';

            console.log(`controllers/shoppingCartController.addItemToCart - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        try {
            const cart = await this.shoppingCartService.addItemToCart(userId, product);
            returnObj.data = cart;
        } catch (error) {
            returnObj.statusCode = 500;
            returnObj.err = error;
        }

        return this.sendResponse(res, returnObj.statusCode, returnObj);
    }

    removeItemFromCart = async (req, res) => {
        const returnObj = { statusCode: 200, err: null, data: null };

        const { userId } = req.body;
        const { id: productId } = req.params;

        if (!userId || !productId) {
            returnObj.statusCode = 400;
            returnObj.err = 'userId and productId data are required';

            console.log(`controllers/shoppingCartController.removeItemFromCart - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        try {
            const cart = await this.shoppingCartService.removeItemFromCart(userId, productId);
            returnObj.data = cart;
        } catch (error) {
            returnObj.statusCode = 500;
            returnObj.err = error;
        }

        return this.sendResponse(res, returnObj.statusCode, returnObj);
    }

    getCart = async (req, res) => {
        const returnObj = { statusCode: 200, err: null, data: null };

        const { userId } = req.query;

        if (!userId) {
            returnObj.statusCode = 400;
            returnObj.err = 'userId data are required';

            console.log(`controllers/shoppingCartController.getCart - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        try {
            const cart = await this.shoppingCartService.getCart(userId);
            returnObj.data = cart;
        } catch (error) {
            returnObj.statusCode = 500;
            returnObj.err = error;
        }

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }
}

module.exports = ShoppingCartController;