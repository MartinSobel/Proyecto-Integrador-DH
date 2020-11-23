var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.get('/register', userController.renderRegister);
router.post('/register', userController.registered);

router.get('/login', userController.renderLogin);
router.post('/logged', userController.renderLogin);

module.exports = router;