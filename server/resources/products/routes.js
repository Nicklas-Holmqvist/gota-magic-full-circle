const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require('../auth/controller')

/////////////// hämtar alla producter /////////////////////
router.get("/api/product/", controller.getAllProducts);
////////////// update stock ////////////////////
router.put("/api/product/:id", auth, controller.updateStock);

module.exports = router;
