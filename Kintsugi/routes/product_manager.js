var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');
const authMiddleware = require('../middlewares/authMiddleware');
const pmMiddleware = require('../middlewares/pmMiddleware');
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
router.post('/store', upload.any(), [check('description').isLength({max:200}), check('price').isInt()], productController.store);

router.get('/edit/:id?', authMiddleware, pmMiddleware, productController.renderProductEdit)
router.post('/edit/:id', upload.any(), [check('description').isLength({max:200}), check('price').isInt()], productController.update);

router.get('/destroy/:id', authMiddleware, pmMiddleware, productController.destroy);



module.exports = router;