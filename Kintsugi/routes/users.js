var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');

const authMiddleware = require('../middlewares/authMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');

let { check, validationResult, body} = require('express-validator');
const { compareSync } = require('bcrypt');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })

router.get('/register',userController.renderRegister);

router.post('/register', [body('email').custom(function(value){
  console.log(value);

  const fs = require ('fs');
  let usersJSON = fs.readFileSync(__dirname + "/../database/users.json", {encoding: 'utf-8'});
  let users;
  if (usersJSON == ""){
      users = [];
  } else {
      users = JSON.parse(usersJSON);
  }
  
  for (let i = 0 ; i < users.length ; i++){
    if (users[i].email == value){
      return false;
    } else { return true; }
  }
}).withMessage('User already exists with that email')] , upload.any(), userController.registered);

router.get('/login', logMiddleware, userController.renderLogin);
router.post('/logged',userController.logged);

router.get('/profile', authMiddleware, userController.renderProfile);

module.exports = router;