const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: "String",
  products: [],
});

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;

// category: the category path made up of hierarchy nodes

// Queries:
// find by category prefix:
// { product.cat: { $regex: "^category prefix" } }
