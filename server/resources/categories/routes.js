const express = require("express");
const controller = require("../categories/categories.controller");
const router = express.Router();

/////////////// hämta alla categorier/////////////////////
router.get("/api/categories/", controller.getAllCategories);

////////////// hämta specifika categorier ///////////////
router.get("/api/categories/:color", controllers.getCategory);

module.exports = router;
