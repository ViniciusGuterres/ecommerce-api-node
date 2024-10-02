const bodyParser = require('body-parser');

const PaymentTransactionController = require('../controllers/paymentTransactionController.js');
const PaymentTransactionService = require('../services/paymentTransactionService.js');

const paymentTransactionService = new PaymentTransactionService();
const paymentTransactionController = new PaymentTransactionController(paymentTransactionService);

module.exports = app => {
    app.post('/payment/credit-card', bodyParser.json(), paymentTransactionController.processCreditCardPayment);
    app.post('/payment/pix', bodyParser.json(), paymentTransactionController.processPixPayment);
    app.get('/payment/status/:transactionId', bodyParser.json(), paymentTransactionController.getTransactionStatus);
}