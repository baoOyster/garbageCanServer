const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new Error("Unauthorized");
        console.log(authHeader); // Bearer token
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.TOKEN_KEY,
            (err, decoded) => {
                if (err) throw new Error("Forbidden"); //invalid token
                req.user = decoded.username;
                next();
            }
        );
    } catch (error) {
        next(error);
    }
}

module.exports = verifyJWT