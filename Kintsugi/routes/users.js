var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })

router.get('/register', userController.renderRegister);
router.post('/register', upload.any() , userController.registered);

router.get('/login', userController.renderLogin);
router.post('/logged', userController.logged);

router.get('/profile', userController.renderProfile);

module.exports = router;