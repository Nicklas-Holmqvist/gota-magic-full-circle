const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

async function run() {
  try {
    await mongoose.connect(
      'connection string', 
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

// run()