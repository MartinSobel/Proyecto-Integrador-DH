var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');
const pmMiddleware = require('../middlewares/pmMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const {check, validationResult, body} = require('express-validator');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

router.get('/', authMiddleware, pmMiddleware,  productController.renderProductManager);

router.get('/add', authMiddleware, pmMiddleware, productController.renderProductAdd);
router.post('/store', [check('description').isLength({max:200}), check('price').isInt()], upload.any(), productController.store);

router.get('/edit/:id?', authMiddleware, pmMiddleware, productController.renderProductEdit);
router.post('/edit/:id', [check('description').isLength({max:200}), check('price').isInt()], upload.any(), productController.update);

router.get('/destroy/:id', authMiddleware, pmMiddleware, productController.destroy);



module.exports = router;