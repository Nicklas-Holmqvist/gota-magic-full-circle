const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imgName: "String",
  productImage: {
    type: String,
    required: true,
  },
  file: "String",
});

const ImageModel = mongoose.model("image", imageSchema);

module.exports = ImageModel;
