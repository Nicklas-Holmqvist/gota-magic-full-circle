const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imgName: "String",
});

const ImageModel = mongoose.model("image", imageSchema);

module.exports = ImageModel;
