const mongoose = require('mongoose')

const shippingSchema = new mongoose.Schema({
  name: "String",
  deliveryTime: "String",
  price: "Number"
})

const ShippingModel = mongoose.model('shippingmethod', shippingSchema)

module.exports = ShippingModel