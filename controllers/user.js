const AuthService = require('../services/auth.js');

class User {
    constructor() {
        this.authService = new AuthService();
    }

    sendResponse(res, statusCode, returnObj) {
        res.status(statusCode).json(returnObj);
        res.send();
    }

    signUp = async (req, res) => {
        const returnObj = { statusCode: 201, err: null, data: null };

        // Req.body validations
        if (!req.body || !Object.values(req.body)?.length) {
            returnObj.statusCode = 400;
            returnObj.err = 'No body received or body empty';

            console.log(`controllers/user.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        if (!req.body.name || typeof req.body.name !== 'string') {
            returnObj.statusCode = 400;
            returnObj.err = 'name no received or type is not a string';

            console.log(`controllers/user.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        if (!req.body.email || typeof req.body.email !== 'string') {
            returnObj.statusCode = 400;
            returnObj.err = 'email no received or type is not a string';

            console.log(`controllers/user.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        if (!req.body.password || typeof req.body.password !== 'string') {
            returnObj.statusCode = 400;
            returnObj.err = 'password no received or type is not a string';

            console.log(`controllers/user.signUp - ${returnObj.err}`);
            this.sendResponse(res, returnObj.statusCode, returnObj);
            return;
        }

        await this.authService.signUp();

        this.sendResponse(res, returnObj.statusCode, returnObj);
    }

    async signIn(req, res) {
        console.log('signIn::');

        res.status(200).send('working');
    }
}

module.exports = User;