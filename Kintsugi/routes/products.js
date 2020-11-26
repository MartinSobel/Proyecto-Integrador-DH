var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

router.get('/menu', productController.renderMenu);

router.get('/product_cart', productController.renderProductCart);
router.get('/product_detail', productController.renderProductDetail);

module.exports = router;