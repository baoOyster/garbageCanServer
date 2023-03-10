const {passwordHash} = require('../utils/passwordValidation');

const register = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) new Error('Please given valid username and password');
        const newUser = new User({
            username: username,
            password: passwordHash(password)
        }); 
        await newUser.save();
        res.status(201).json({mes: "Your account has been created successfully!", success: true});
    } catch (error) {
        next(error);
    }
}

module.exports = {register}