const express = require('express');
const controller = require('../orders/order.controller');
const orderRouter = express.Router();

/////////////// skapa en order /////////////////////
router.post('/api/order/', controller.createOrder);
////////////// visa alla ordrar ///////////////
router.get('/api/order/', controller.viewAllOrders);



module.exports = orderRouter;