const mongoose = require('mongoose')

const shippingSchema = new mongoose.Schema({
  name: "String",
  price: Number,
  deliveryTime: Date
})

const ShippingModel = mongoose.model('shippingMethod', shippingSchema)

module.exports = ShippingModel