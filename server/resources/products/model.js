const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: "String",
  price: {
    type: Number,
    min: 0
  },
  stock: Number,
  category: "String",
  color: "String",
  cmc: "String", // Number?
  cardType: "String",
  expansion: "String",
  image: "String"
})

const ProductModel = mongoose.model('product', productSchema)

module.exports = ProductModel