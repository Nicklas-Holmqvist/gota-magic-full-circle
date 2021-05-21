const express = require('express');
const controller = require('../orders/controller');
const orderRouter = express.Router();

/////////////// skapa en order /////////////////////
orderRouter.post('/api/order/', controller.createOrder);
////////////// visa alla ordrar ///////////////
orderRouter.get('/api/order/', controller.viewAllOrders);



module.exports = orderRouter;