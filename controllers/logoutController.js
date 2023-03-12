const User = require('../db/User');

const logout = async (req, res, next) => {
    try {
        // Remember to check that you must delete the token on the client side
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.sendStatus(204); // NO content
        const token = cookies.jwt;

        // Is token in the db
        const foundUser = await User.findOne({ token: token });
        if(!foundUser){
            res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: false });
            return res.sendStatus(204);
        }

        // Delete token in db
        foundUser.token = '';
        await foundUser.save();
        res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: false });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = logout;