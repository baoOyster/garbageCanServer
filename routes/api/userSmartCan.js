const router = require('express').Router();
const {getUserByToken, addSmartCanToAccountByToken, discardACanFromAccount, updateAUser, deleteAUser} = require('../../controllers/usersController');
const {switchingFullState, updateSmartCanName} = require('../../controllers//smartCanController');

router.route('/home')
    .get(getUserByToken)
    .put(addSmartCanToAccountByToken)
    .delete(discardACanFromAccount);

router.put('/name', updateSmartCanName);
router.put('/switch', switchingFullState);

router.route('/setting')
    .put(updateAUser)
    .delete(deleteAUser);

module.exports = router;