const express = require('express');
const controller = require('../products/products.controller');
const productRouter = express.Router();

/////////////// hämtar alla producter /////////////////////
router.get('/api/poduct/', controller.getAllProducts);
///////////////                      /////////////////////
router.get('/api/poduct/:id', controller.getSpecProduct);
//////////////                       ////////////////////
router.put('/api/poduct/:id', controller.changeProduct);


module.exports = productRouter;