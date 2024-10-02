class PaymentTransactionController {
    constructor(paymentTransactionService) {
        this.paymentTransactionService = paymentTransactionService;
    }

    processCreditCardPayment = async (req, res) => {
        const { userId, cartId, totalAmount } = req.body;

        if (!userId || !cartId || !totalAmount) {
            return res.status(400).json({ error: 'userId, cartId, and totalAmount are required' });
        }

        try {
            const transaction = await this.paymentTransactionService.processCreditCardPayment(userId, cartId, totalAmount);
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    processPixPayment = async (req, res) => {
        const { userId, cartId, totalAmount } = req.body;

        if (!userId || !cartId || !totalAmount) {
            return res.status(400).json({ error: 'userId, cartId, and totalAmount are required' });
        }

        try {
            const transaction = await this.paymentTransactionService.processPixPayment(userId, cartId, totalAmount);
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getTransactionStatus = async (req, res) => {
        const { transactionId } = req.params;

        if (!transactionId) {
            return res.status(400).json({ error: 'transactionId is required' });
        }

        try {
            const transaction = await this.paymentTransactionService.getTransactionStatus(transactionId);
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PaymentTransactionController;