/**
 * All the function is this file is tested and run successfully
 */


const SmartCan = require('../db/SmartCan');

/**
 * -------------This is using for development only--------------------------------
*/ 
const getAllCans = async (req, res, next) => {
    // Getting all cans data
    try {
        const foundCans = await SmartCan.find();
        res.json({foundCans, success: true});
    } catch (error) {
        next(error);
    }
};

const createCans = async (req, res, next) => {
    // Create numbers of cans as requested
    try {
        const { num } = req.query;
        if(!num) num = '1';
        const canArr = [];
        for(let i = 0; i < parseInt(num); i++) {
            canArr.push({
                is_full: false,
                owner_id: []
            })
        };
        await SmartCan.insertMany(canArr);
        res.status(201).json({mes: `${num} has been created`, success: true});
    } catch (error) {
        next(error);
    }
}

const deleteACan = async (req, res, next) => {
    // delete a smart can
    try {
        const { id } = req.query;
        await SmartCan.deleteOne({_id: id});
        res.status(204).json({mes: `Smart can with id ${id} has been deleted`, success: true});
    } catch (error) {
        next(error);
    }
};

/**
 * --------------This is using for product only--------------------------------
*/ 
const getFullState = async (req, res, next) => {
    // Getting full state
    try {
        const { id } = req.query;
        const myCan = await SmartCan.findById(id);
        if(!myCan) new Error('Couldn\'t find the requested can');
        res.json({is_full: myCan.is_full, success: true});
    } catch (error) {
        next(error);
    }
};

const switchingFullState = async (req, res, next) => {
    // Switching the full state
    try {
        const { id } = req.query;
        const myCan = await SmartCan.findById(id);
        if(!myCan) new Error('Couldn\'t find the requested can');
        if(myCan.is_full) myCan.is_full = false;
        else myCan.is_full = true; 
        await myCan.save();
        res.status(200).json({mes: `The full state have been switched to ${myCan.is_full}`, success: true});
    } catch (error) {
        next(error);
    }
};

module.exports = {getFullState, switchingFullState, getAllCans, createCans, deleteACan}