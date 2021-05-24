const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  catName: "String",
});

const CategoryModel = mongoose.model("categorie", categorySchema);

module.exports = CategoryModel;

// category: the category path made up of hierarchy nodes

// Queries:
// find by category prefix:
// { product.cat: { $regex: "^category prefix" } }
// asfdjaksfdh/asdasdjsad/12314
