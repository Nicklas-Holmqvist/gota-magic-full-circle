const express = require("express");
const controller = require("./controller");
const router = express.Router();

/////////////// hämta alla categorier/////////////////////
router.get("/api/categories/", controller.getAllCategories);

////////////// hämta specifika categorier ///////////////
router.get("/api/categories/:id", controller.getCategory);

module.exports = router;
