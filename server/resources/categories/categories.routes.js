const express = require('express');
const controller = require('../categories/categories.controller');
const categoryRouter = express.Router();

/////////////// hämta alla categorier/////////////////////
router.get('/api/categories/', controller.getAll);

////////////// hämta specifika categorier ///////////////
router.get('/api/categories/:id', controllers.getCategory);

module.exports = categoryRouter;