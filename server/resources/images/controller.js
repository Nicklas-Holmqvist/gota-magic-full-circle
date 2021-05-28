const express = require("express");
const ImageModel = require("./model");

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

exports.uploadImage = async (req, res, next) => {
  // const image = new ImageModel({
  //     _id: new mongoose.Types.ObjectId()
  // })
  //   const imgName = req.body;

  //   const newImage = {
  //     imgName: imgName,
  //   };
  const newImage = req.body;
  try {
    console.log(req.file, "hejsan?");
    const image = await ImageModel.create(req.file);
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json(error, "It is a no working yo");
  }
};
