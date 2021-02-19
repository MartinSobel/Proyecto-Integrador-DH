var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/menu', authMiddleware, productController.renderMenu);

router.get('/cart', productController.renderProductCart);
router.get('/detail/:id', productController.renderProductDetail);

router.post('/addToCart/:id', productController.addToCart);

router.post('/addAnother/:id', productController.addAnother);

module.exports = router;