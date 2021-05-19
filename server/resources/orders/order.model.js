const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {},
  items: [],
  shipping: {},
  totalCost: Number,
  sent: Boolean
}, { timestamps: true })

const OrderModel = mongoose.model('product', orderSchema)

module.exports = OrderModel