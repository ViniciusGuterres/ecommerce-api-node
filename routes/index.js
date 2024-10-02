const usersRoutes = require('./userRoutes.js');
const productsRoutes = require('./productRoutes.js');
const shoppingCartsRoutes = require('./shoppingCartRoutes.js');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send('Hello world!');
    })

    usersRoutes(app);
    productsRoutes(app);
    shoppingCartsRoutes(app);
    
    // Applying a 404 route handler for all methods
    app.use((req, res) => {
        res.status(404).send('404 not found');
    });
}