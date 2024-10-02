const bodyParser = require('body-parser');

const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

const userService = new UserService();
const userController = new UserController(userService);

module.exports = app => {
    app.post('/signin', bodyParser.json(), userController.signIn);
    app.post('/signup', bodyParser.json(), userController.signUp);
}