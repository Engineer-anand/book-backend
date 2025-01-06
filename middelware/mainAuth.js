require('dotenv').config();
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const secret ="anand@12345"

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, JWT token is required' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach user to request object
        next(); // Proceed to next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'JWT token has expired, please log in again' });
        }
        return res.status(401).json({ message: 'Unauthorized, JWT token is invalid or expired' });
    }
};

module.exports = ensureAuthenticated;
