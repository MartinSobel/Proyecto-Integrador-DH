var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

router.get('/register', userController.renderRegister);
router.get('/login', userController.renderLogin);

module.exports = router;