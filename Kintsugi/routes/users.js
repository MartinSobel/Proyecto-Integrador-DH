var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');
const authMiddleware = require('../middlewares/authMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');

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
router.post('/register', upload.any() , userController.registered);

router.get('/login', logMiddleware ,userController.renderLogin);
router.post('/logged', userController.logged);

router.get('/profile', authMiddleware, userController.renderProfile);

module.exports = router;