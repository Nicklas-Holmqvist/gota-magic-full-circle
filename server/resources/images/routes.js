const express = require("express");
const controller = require("./controller");
const router = express.Router();
// const fileUpload = require("express-fileupload");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// router.use(express.static("uploads"));

// router.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
//   console.log(req.files);

//   res.status(200).send();
// });
router.post("/uploads", upload.single("productImage"), controller.uploadImage);

// router.post("/uploads", upload.single("productImage"), (req, res, next) => {
//   console.log(req.file);

module.exports = router;
