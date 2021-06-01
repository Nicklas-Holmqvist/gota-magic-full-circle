const express = require("express");
const { Mongoose } = require("mongoose");
const ImageModel = require("./model");

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

exports.uploadImage = async (req, res, next) => {
  const newImage = {
    // _id: new mongoose.Types.ObjectId(),
    imgName: req.body.imgName,
    productImage: req.file.path,
  };

  try {
    console.log(req.file, "hejsan?");
    const image = await ImageModel.create(newImage);
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json(error, "It is a no working yo");
  }
};
