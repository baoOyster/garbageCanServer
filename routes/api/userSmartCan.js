const router = require('express').Router();
const {getUserById, addSmartCanToAccountById, discardACanFromAccount, updateAUser, deleteAUser} = require('../../controllers/usersController');

router.route('/home')
    .get(getUserById)
    .put(addSmartCanToAccountById)
    .delete(discardACanFromAccount);

router.route('/setting')
    .put(updateAUser)
    .delete(deleteAUser);

module.exports = router;