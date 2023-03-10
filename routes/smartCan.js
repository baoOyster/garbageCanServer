const router = require('express').Router();
const {getFullState, switchingFullState, getAllCans, createCans, deleteACan} = require('../controllers/smartCanController');

router.route('')
    .get(getFullState)
    .put(switchingFullState)

router.route('/dev')
    .get(getAllCans)
    .post(createCans)
    .delete(deleteACan)
    

module.exports = router;