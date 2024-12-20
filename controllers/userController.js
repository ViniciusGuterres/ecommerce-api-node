class User {
    constructor(UserService) {
        this.userService = UserService;
    }

    sendResponse(res, statusCode, returnObj) {
        return res.status(statusCode).json(returnObj);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    signUp = async (req, res) => {
        const returnObj = { statusCode: 201, err: null, data: null };

        // Req.body validations
        if (!req.body || !Object.values(req.body)?.length) {
            returnObj.statusCode = 400;
            returnObj.err = 'No body received or body empty';

            console.log(`controllers/userController.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { name, email, password } = req.body;

        if (!name || typeof name !== 'string') {
            returnObj.statusCode = 400;
            returnObj.err = 'name no received or type is not a string';

            console.log(`controllers/userController.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        if (!email || typeof email !== 'string') {
            returnObj.statusCode = 400;
            returnObj.err = 'email no received or type is not a string';

            console.log(`controllers/userController.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        if (!this.validateEmail(email)) {
            returnObj.statusCode = 400;
            returnObj.err = 'email format not valid';

            console.log(`controllers/userController.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        if (!password || typeof password !== 'string') {
            returnObj.statusCode = 400;
            returnObj.err = 'password no received or type is not a string';

            console.log(`controllers/userController.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { err, data } = await this.userService.signUp(name, email, password);

        if (err) {
            returnObj.statusCode = 500;
            returnObj.err = err;

            console.log(`controllers/userController.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        returnObj.data = data;

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }

    signIn = async (req, res) => {
        const returnObj = { statusCode: 200, err: null, data: null };

        // Req.body validations
        if (!req.body || !Object.values(req.body)?.length) {
            returnObj.statusCode = 400;
            returnObj.err = 'No body received or body empty';

            console.log(`controllers/userController.signIn - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { email, password } = req.body;

        // Req.body validations
        if (!email || !password) {
            returnObj.statusCode = 400;
            returnObj.err = 'No email or password received';

            console.log(`controllers/userController.signIn - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        const { err, data } = await this.userService.signIn(email, password);

        if (err) {
            returnObj.statusCode = 500;
            returnObj.err = err;

            console.log(`controllers/userController.signIn - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        returnObj.data = data;

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }
}

module.exports = User;