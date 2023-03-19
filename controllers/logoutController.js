const User = require('../db/User');

const logout = async (req, res, next) => {
    try {
        const {token} = req.query;

        // Is token in the db
        const foundUser = await User.findOne({ token: token });
        if(!foundUser){
            res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: false });
            res.sendStatus(204); // NO content
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