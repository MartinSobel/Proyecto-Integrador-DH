var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');

const authMiddleware = require('../middlewares/authMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');

let { check, validationResult, body} = require('express-validator');
const { compareSync } = require('bcrypt');
   

router.get('/register',userController.renderRegister);

router.post('/register', userController.registered);

router.get('/login', logMiddleware, userController.renderLogin);
router.post('/logged', userController.logged);

router.get('/profile/:id', authMiddleware, userController.renderProfile);
router.post('/profile/:id', userController.editProfile);

router.get('/logout', userController.logout);

module.exports = router;