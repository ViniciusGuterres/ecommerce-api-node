const crypto = require('crypto');
const { promisify } = require('util');

const scrypt = promisify(crypto.scrypt);

const jwt = require('jsonwebtoken');
const secret = 'mySecretKey';

async function generateToken(user) {
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({ id, email }, secret, { expiresIn: '1h' });

    return token;
}

async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ Message: 'Token não informado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ Message: 'Token inválido' });
        }

        req.user = decoded;
        next();
    });
}

async function hashPassword(password) {
    // Generate a salt (random string of numbers and letters)
    const salt = crypto.randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = await scrypt(password, salt, 32);

    // Join the hashed result and the salt together
    const hashPassword = `${salt}.${hash.toString('hex')}`;

    return hashPassword;
}

async function comparePassword(savePasswordHashed, reqPassword) {
    // Build the param password hash to compare to the stored password hash
    const [salt, storedHash] = savePasswordHashed.split('.');

    const hash = await scrypt(reqPassword, salt, 32);

    if (storedHash !== hash.toString('hex')) {
        return false;
    }

    return true;
}

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };