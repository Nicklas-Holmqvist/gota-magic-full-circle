const express = require("express");
const controller = require("./controller");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.use(express.static("uploads"));

// router.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
//   console.log(req.files);

//   res.status(200).send();
// });
router.post("/uploads", upload.single("productImage"), controller.uploadImage);

// router.post("/uploads", upload.single("productImage"), (req, res, next) => {
//   console.log(req.file);

module.exports = router;
