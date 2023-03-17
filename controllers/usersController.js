/**
 * All these methods in this file are used for development only
 */

const User = require('../db/User');
const SmartCan = require('../db/SmartCan');
const {passwordHash, comparePasswords} = require('../utils/passwordValidation');

const getUserByToken = async (req, res, next) => {
    // Get user information
    try {
        const {token} = req.query;
        
        // Check token availability
        if(!token) throw new Error("Unauthorized")
        const user = await User.findOne({token: token});
        
        // Check if user is auth
        if(!user) throw new Error(`No user found`);

        // Get all user data
        const allOwnedCan = await SmartCan.find({owner_id: user._id}, {is_full: 1, name: 1});

        res.json({allOwnedCan, success: true});
    } catch (error) {
        next(error);
    }
};

const addSmartCanToAccountByToken = async (req, res, next) => {
    // Add a smart can to the account by using id
    try {
        const {token, canId} = req.query;
        // Check token and canId availability
        if(!token || !canId) throw new Error('Unauthorized or there is no canId');

        // Search for the requested can
        const foundCan = await SmartCan.findById(canId);
        if(!foundCan) throw new Error(`Couldn't find smart can with id ${canId}`);

        // Check for the requested user
        const foundUser = await User.findOne({token: token});
        if(!foundUser) throw new Error(`No user found`);

        // Check if the can has been already added to the account
        const isAlreadyOwned = foundCan.owner_id.includes(foundUser._id.toString());
        if(isAlreadyOwned) throw new Error(`Can has been already owned by the user with id ${foundUser._id}`);

        // Push the can to the account
        foundCan.owner_id.push(foundUser._id);
        await foundCan.save();
        res.json({mes: `Can with id ${canId} has been added to your account successfully`, success: true});
    } catch (error) {
        next(error);
    }
}

const discardACanFromAccount = async (req, res, next) => {
    // Delete a can from the account
    try {
        const {token, canId} = req.query;

        // Check token and canId availability
        if(!token || !canId) throw new Error(`Unauthorized or no canId`);

        // Check if any can match with the canId
        const foundCan = await SmartCan.findById(canId);
        if(!foundCan) throw new Error(`Could not find the can with id ${canId}`);

        // Check if the user is authorized
        const foundUser = await User.findOne({token: token});
        if(!foundUser) throw new Error(`Could not find the user`);

        // Discard a can
        foundCan.owner_id = foundCan.owner_id.filter(personId => personId != foundUser._id);
        await foundCan.save();
        res.status(204).json({mes: `Smart can with ${canId} has been discarded from your account`, success: true});
    } catch (error) {
        next(error);
    }
}

const updateAUser = async (req, res, next) => {
    // Update a user account
    try {
        const {token} = req.query;
        
        //Check if token is provided 
        if(!token) throw new Error('Unauthorized');

        // Check is password, newUsername and newPassword is provided
        const {password, newUsername, newPassword} = req.body;
        if(!password) throw new Error('Both password, newUsername and newPassword must be provided');

        // Check if the user is available
        const foundUser = await User.findOne({token: token});
        if(!foundUser) throw new Error(`Couldn\'t find any user`);

        // Password validation
        const passwordValidation = await comparePasswords(password, foundUser.password);
        if(!passwordValidation) throw new Error('Please provide the valid password');

        // Change info and save
        if(newUsername) foundUser.username = newUsername;
        if(newPassword) foundUser.password = await passwordHash(newPassword);
        await foundUser.save();
        res.json({mes: `User with id of ${foundUser._id} username and password has been updated successfully`, success: true});   
    } catch (error) {
        next(error);
    }
}

const deleteAUser = async (req, res, next) => {
    try {
        const {token} = req.query;

        // Check toke availability
        if(!token) throw new Error('Unauthorized');

        // Delete user ownership on all cans
        const user = await User.findOne({token: token});
        const userId = user._id.toString();
        const canArray = await SmartCan.find({owner_id: userId});
        if(canArray.length > 0) {
            canArray.forEach(async (can) => {
                const removedCan = await SmartCan.findById(can._id);
                removedCan.owner_id = removedCan.owner_id.filter(id => id !== userId);
                await removedCan.save(); 
            })
        }

        // Delete user from the database
        await User.deleteOne({token: token});
        res.status(204).json({mes: `User has been deleted`, success: true});
    } catch (error) {
        next(error);
    }
}

module.exports = {getUserByToken, addSmartCanToAccountByToken, updateAUser, deleteAUser, discardACanFromAccount};