const express = require('express');
const controller = require('./controller');
const router = express.Router();

// Fetch all shippingMethods
router.get('/api/shipping/', controller.getShippingMethod);


module.exports = router;



