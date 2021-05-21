const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: "String",
  products: []
})

const CategoryModel = mongoose.model('product', categorySchema)

module.exports = CategoryModel