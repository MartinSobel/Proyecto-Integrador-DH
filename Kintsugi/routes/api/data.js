var express = require('express');
var router = express.Router();
var dataApiController = require("../../controllers/api/dataApiController.js");
router.get('/users', dataApiController.users);
router.get('/products', dataApiController.products);
router.get('/sales', dataApiController.sales);
router.get('/status', dataApiController.status);

module.exports=router