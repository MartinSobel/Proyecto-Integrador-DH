var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/menu', authMiddleware, productController.renderMenu);
router.get('/menu/rolls', authMiddleware, productController.renderMenuRolls);
router.get('/menu/mixed', authMiddleware, productController.renderMenuMixed);
router.get('/menu/snacks', authMiddleware, productController.renderMenuSnacks);
router.get('/menu/salads', authMiddleware, productController.renderMenuSalads);
router.get('/menu/tempura', authMiddleware, productController.renderMenuTempura);
router.get('/menu/dessert', authMiddleware, productController.renderMenuDessert);
router.get('/menu/drinks', authMiddleware, productController.renderMenuDrinks);

router.get('/cart', authMiddleware, productController.renderProductCart);
router.get('/detail/:id', productController.renderProductDetail);

router.get('/checkout', productController.renderCheckout);
router.post('/checkout', productController.closeCart);

router.post('/addToCart/:id', productController.addToCart);

router.post('/addAnother/:id', productController.addAnother);

router.post('/deleteOne/:id', productController.deleteOne);

module.exports = router;