const { verifyToken } = require('../auth.js');

const PaymentTransactionController = require('../controllers/paymentTransactionController.js');
const PaymentTransactionService = require('../services/paymentTransactionService.js');

const paymentTransactionService = new PaymentTransactionService();
const paymentTransactionController = new PaymentTransactionController(paymentTransactionService);

module.exports = app => {
    app.post('/payment/credit-card', verifyToken, paymentTransactionController.processCreditCardPayment);
    app.post('/payment/pix', verifyToken, paymentTransactionController.processPixPayment);
    app.get('/payment/status/:transactionId', verifyToken, paymentTransactionController.getTransactionStatus);
}