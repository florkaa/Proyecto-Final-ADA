var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController')
var itemController = require('../controllers/itemController')


/* GET home page. */
router.get('/api/items/', searchController.search);

router.get('/api/producto/:id', itemController.producto);

module.exports = router;
