const User = require('../db/User');
const jwt = require('jsonwebtoken');
const {passwordHash} = require('../utils/passwordValidation');

const register = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) throw new Error('Please given valid username and password');
        const isUserExist = await User.findOne({username: username});
        if(isUserExist) throw new Error('The username has already been used');
        const newUser = new User({
            username: username,
            password: await passwordHash(password)
        });
        
        // Adding token to the database
        const token = jwt.sign(
            {user_id: newUser._id},
            process.env.TOKEN_KEY,
            {expiresIn: "2h"}
        )

        newUser.token = token;
        await newUser.save();
        // Assign cookie to client
        res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({mes: "Your account has been created successfully!", success: true, token: token});
    } catch (error) {
        next(error);
    }
}

module.exports = register;