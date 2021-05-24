
const mongoose = require('mongoose')
const Shipping = require('../shipping/model')
const Product = require('../products/model')


const addressSchema = mongoose.Schema({
  street: {
    type: 'String',
    reuired: true},
  zipCode: {
    type:'Number',
    required: true},
  city: {
    type: 'String',
    required: true
  }
})

/////////// OBS! ändra till user:ObjektId, shipping: Shipping, products:[Product, adress:Adress] och lägg till objektid på modellen /////////
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: 'Number',
    required: true
  },
  userId: {
    type: 'String',
    required: true
  },
  user: {
    type: 'String',
    required: true
  },
  totalCost: Number,
  shipping: String,
  sent: Boolean,
  products: String,
  adress: [addressSchema]
}, { timestamps: true })

const OrderModel = mongoose.model('order', orderSchema)

module.exports = OrderModel