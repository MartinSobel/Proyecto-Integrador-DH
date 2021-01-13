var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

const authMiddleware = require('../middlewares/authMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');


const { compareSync } = require('bcrypt');
   

router.get('/register', userController.renderRegister);
router.post('/register', [body('email').custom(function(value){
    
    db.User.findOne({
        where:{
            email: value
        }
    }).then((result)=>{
       if(result == value ){
           return false;
       }else{
           return true;
       }
    }).withMessage ('User already exists')
})], userController.registered);

router.get('/login',logMiddleware, userController.renderLogin);
router.post('/logged', userController.logged);

router.get('/profile/:id', authMiddleware, userController.renderProfile);
router.post('/profile/:id', userController.editProfile);

router.get('/logout', userController.logout);


module.exports = router;