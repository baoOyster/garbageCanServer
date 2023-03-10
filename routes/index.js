const router = require('express').Router();
const registerFunc = require('../controllers/registerController');
const loginFunc = require('../controllers/loginController');

router.post('/login', loginFunc);
router.post('/register', registerFunc);

module.exports = router;