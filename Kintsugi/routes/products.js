var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

router.get('/menu', productController.renderMenu);

router.get('/cart', productController.renderProductCart);
router.get('/detail/:id', productController.renderProductDetail);

router.post('/addToCart/:id', productController.addToCart);

module.exports = router;