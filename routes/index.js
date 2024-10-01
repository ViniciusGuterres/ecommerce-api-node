const myTestRoute = require('./myRoute.js');

module.exports = app => {
    myTestRoute(app);
    
    // Applying a 404 route handler for all methods
    app.use((req, res) => {
        res.status(404).send('404 not found');
    });
}