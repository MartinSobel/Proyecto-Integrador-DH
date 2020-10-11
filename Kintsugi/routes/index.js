var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product_detail', function(req, res, next) {
  res.render('product_detail', { title: 'Express' });
});

router.get('/product_cart', function(req, res, next) {
  res.render('product_cart', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/product_add', function(req, res, next) {
  res.render('product_add', { title: 'Express' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Express' });
});

module.exports = router;
