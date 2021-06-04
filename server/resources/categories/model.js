const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  catName: "String",
});

const CategoryModel = mongoose.model("categorie", categorySchema);

module.exports = CategoryModel;

