const jwt = require('jsonwebtoken');
const User = require('../db/User');
const {comparePasswords} = require('../utils/passwordValidation');

const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) throw new Error('Both username and password required');
        // Find user
        const user = await User.findOne({username: username});
        if(!user) throw new Error('User not found');
        // Checking password valid
        const passwordValidation = await comparePasswords(password, user.password);
        if(!passwordValidation) throw new Error('Invalid password');
        // Signing token to user
        const token = jwt.sign(
            {user_id: user._id},
            process.env.TOKEN_KEY,
            {expiresIn: '2h'}
        )

        user.token = token;
        await user.save();
        // Assign cookie to client
        res.cookie('jwt', token, { httpOnly: false, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });
        res.json({mes: "You have login successfully", success: true, token: token});
    } catch (error) {
        next(error);
    }
}

module.exports = login;