const bodyParser = require('body-parser');

module.exports = app => {
    app.get('/test', bodyParser.json(), () => {
        console.log('my route');
    })
}