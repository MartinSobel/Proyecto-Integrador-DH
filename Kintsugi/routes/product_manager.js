var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

router.get('/', productController.renderProductManager);

router.get('/add', productController.renderProductAdd);
router.post('/store', productController.store);

router.get('/edit/:id?', productController.renderProductEdit);
router.post("/edit/:id", productController.update);

router.get('/destroy/:id', productController.destroy);

module.exports = router;