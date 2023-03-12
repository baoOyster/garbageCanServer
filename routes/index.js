const router = require('express').Router();
const registerFunc = require('../controllers/registerController');
const loginFunc = require('../controllers/loginController');
const logoutFunc = require('../controllers/logoutController');

router.post('/login', loginFunc);
router.post('/register', registerFunc);
router.post('/logout', logoutFunc);

module.exports = router;