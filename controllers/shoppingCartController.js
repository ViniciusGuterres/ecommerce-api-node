class ShoppingCartController {
    constructor(shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    addItemToCart = async (req, res) => {
        const { userId, product } = req.body;

        if (!userId || !product) {
            return res.status(400).json({ error: 'userId and product data are required' });
        }

        try {
            const cart = await this.shoppingCartService.addItemToCart(userId, product);
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    removeItemFromCart = async (req, res) => {
        const { userId } = req.body;
        const { id: productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({ error: 'userId and productId are required' });
        }

        try {
            const cart = await this.shoppingCartService.removeItemFromCart(userId, productId);
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getCart = async (req, res) => {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        try {
            const cart = await this.shoppingCartService.getCart(userId);
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ShoppingCartController;