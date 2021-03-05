var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');
const pmMiddleware = require('../middlewares/pmMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

router.get('/', pmMiddleware,  productController.renderProductManager);

router.get('/add', pmMiddleware, productController.renderProductAdd);
router.post('/store', upload.any(), productController.store);

router.get('/edit/:id?', pmMiddleware, productController.renderProductEdit);
router.post('/edit/:id', upload.any(), productController.update);

router.get('/destroy/:id', pmMiddleware, productController.destroy);

module.exports = router;