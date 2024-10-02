const sequelize = require('../db');
const User = require('../models/user.js')(sequelize);

class userService {
    signUp = async (name, email, password) => {
        const returnObj = { err: null, data: null };

        try {
            const userWithPassedEmail = await User.findOne({ where: { email } });

            if (userWithPassedEmail) {
                returnObj.err = 'email already in use';
                return returnObj;
            }

            const newUser = await User.create({
                email,
                name,
                password,
            });

            // Deleting the password to do not return in the request 
            delete newUser.dataValues.password;

            returnObj.data = newUser || null;

            return returnObj;
        } catch (error) {
            throw error;
        }
    }

    findUserByEmail = async (email) => {
        try {
            const userWithPassedEmail = await User.findOne({ where: { email } });

            return userWithPassedEmail;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = userService;