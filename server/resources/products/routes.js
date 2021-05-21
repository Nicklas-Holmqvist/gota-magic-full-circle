const express = require("express");
const controller = require("./controller");
const router = express.Router();

/////////////// hämtar alla producter /////////////////////
router.get("/api/product/", controller.getAllProducts);
///////////////                      /////////////////////
router.get("/api/product/:id", controller.getSpecProduct);
//////////////                       ////////////////////
router.put("/api/product/:id", controller.updateStock);

module.exports = router;
