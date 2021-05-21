const express = require('express')
const mongoose = require('mongoose')

const productRouter = require('./resources/products/routes')
const orderRouter = require('./resources/orders/routes')

// This two always on TOP!!!
const app = express()
app.use(express.json())
//

app.use(productRouter)
app.use(orderRouter)


async function run() {
  try {
    await mongoose.connect(
      'mongodb+srv://Olof:qwerty123@cluster0.0tiz6.mongodb.net/magic',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('Database is connected')
  } catch (error) {
    console.error(error)
  }
}

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})

run()