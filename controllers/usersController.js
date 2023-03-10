/**
 * All these methods in this file are used for development only
 */

const User = require('../db/User');
const SmartCan = require('../db/SmartCan');
const {comparePasswords} = require('../utils/passwordValidation');

const getUserById = async (req, res, next) => {
    // Get user information
    try {
        const {id} = req.query;
        const user = await User.findById(id);
        if(!user) throw new Error(`There are\'t any user with the id of ${id}`);
        res.json({user, success: true});
    } catch (error) {
        next(error);
    }
};

const addSmartCanToAccountById = async (req, res, next) => {
    // Add a smart can to the account by using id
    try {
        const {id, canId} = req.query;
        const foundCan = await SmartCan.findById(canId);
        if(!foundCan) throw new Error(`Couldn't find smart can with id ${id}`);
        foundCan.owner_id.push(id);
        await foundCan.save();
        res.json({mes: `Can with id ${id} has been added to your account successfully`, success: true});
    } catch (error) {
        next(error);
    }
}

const discardACanFromAccount = async (req, res, next) => {
    // Delete a can from the account
    try {
        const {id, canId} = req.query;
        const foundCan = await SmartCan.findById(canId);
        if(!foundCan) throw new Error(`Could not find the can with id ${id}`);
        foundCan.owner_id = foundCan.owner_id.filter(personId => personId != id);
        await foundCan.save();
        res.status(204).json({mes: `Smart can with ${id} has been discarded from your account`, success: true});
    } catch (error) {
        next(error);
    }
}

const updateAUser = async (req, res, next) => {
    // Update a user account
    try {
        const {id} = req.query;
        const {password, newUsername, newPassword} = req.body;
        const foundUser = await User.findById(id);
        if(!foundUser) throw new Error(`Couldn\'t find any user with the id of ${id}`);
        const passwordValidation = await comparePasswords(password, foundUser.password);
        if(!passwordValidation) throw new Error('Please provide the valid password');
        foundUser.username = newUsername;
        foundUser.password = newPassword;
        await foundUser.save();
        res.json({mes: `User with id of ${id} username and password has been updated successfully`, success: true});   
    } catch (error) {
        next(error);
    }
}

const deleteAUser = async (req, res, next) => {
    try {
        const {id} = req.query;
        await User.deleteOne({_id: id});
        res.status(204).json({mes: `User with id ${id} has been deleted`, success: true});
    } catch (error) {
        next(error);
    }
}

module.exports = {getUserById, addSmartCanToAccountById, updateAUser, deleteAUser, discardACanFromAccount};