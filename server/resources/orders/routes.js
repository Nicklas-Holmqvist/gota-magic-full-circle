const express = require('express');
const controller = require('../orders/controller');
const orderRouter = express.Router();
const { auth, isLoggedIn } = require('../auth/controller')

/////////////// skapa en order /////////////////////
orderRouter.post('/api/order/', isLoggedIn, controller.createOrder);
////////////// visa alla ordrar ///////////////
orderRouter.get('/api/order/', auth, controller.viewAllOrders);



module.exports = orderRouter;