const express = require("express");
const controller = require("./controller");
const router = express.Router();

/////////////// hämta alla categorier/////////////////////
router.get("/auth", controller.isAuth);

module.exports = router;