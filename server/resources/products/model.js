const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const {Types} = require("mongoose");

const productSchema = new mongoose.Schema({
  name: "String",
  price: {
    type: Number,
    min: 0,
  },
  stock: Number,
  // ref ska vara modellen
  categories: [{
    type: Types.ObjectId,
    ref: 'categorie'}],
  color: "String",
  cmc: "String",
  cardType: "String",
  expansion: "String",
  image: "String",
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
