const sequelize = require('../db');
const User = require('../models/user.js')(sequelize);
const { hashPassword, comparePassword, generateToken } = require('../auth.js');

class userService {
    signUp = async (name, email, password) => {
        const returnObj = { err: null, data: null };

        try {
            const userWithPassedEmail = await User.findOne({ where: { email } });

            if (userWithPassedEmail) {
                returnObj.err = 'email already in use';
                return returnObj;
            }

            // auth method
            const passwordHashed = await hashPassword(password);

            const newUser = await User.create({
                email,
                name,
                password: passwordHashed,
            });

            // Deleting the password to do not return in the request 
            delete newUser.dataValues.password;

            returnObj.data = newUser || null;

            return returnObj;
        } catch (error) {
            throw error;
        }
    }

    signIn = async (email, password) => {
        const returnObj = { err: null, data: null };

        try {
            // Get user filtered by email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                returnObj.err = 'Invalid email or password';
                return returnObj;
            }

            const mySaveUserPassword = user.dataValues.password;
            const comparePasswordResult = await comparePassword(mySaveUserPassword, password); 

            if (!comparePasswordResult) {
                returnObj.err = 'Invalid email or password';
                return returnObj;
            }

            const jwtToken = await generateToken(user);

            returnObj.data = jwtToken;
        } catch (error) {
            throw error;
        }

        return returnObj;
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