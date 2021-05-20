const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {},
  items: [], // ändra till products
  shipping: {},
  totalCost: Number,
  sent: Boolean
}, { timestamps: true })

const OrderModel = mongoose.model('product', orderSchema)

module.exports = OrderModel