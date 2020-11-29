var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();
let multer = require('multer');
let path = require ('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

router.get('/', productController.renderProductManager);

router.get('/add', productController.renderProductAdd);
router.post('/store', upload.any(), productController.store);

router.get('/edit/:id?', productController.renderProductEdit);
router.post("/edit/:id", productController.update);

router.get('/destroy/:id', productController.destroy);

module.exports = router;