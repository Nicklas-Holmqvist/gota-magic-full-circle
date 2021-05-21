const express = require("express");
const mongoose = require("mongoose");

const productRouter = require("./resources/products/routes");
const userRouter = require("./resources/users/routes");
const shippingRouter = require("./resources/shipping/routes");
const categoryRouter = require("./resources/categories/routes");

// This two always on TOP!!!
const app = express();
app.use(express.json());
//

app.use(productRouter);
app.use(userRouter);
app.use(categoryRouter);

app.use(shippingRouter);

async function run() {
  try {
    await mongoose.connect(
      "mongodb+srv://timpa:qwerty123@cluster0.0tiz6.mongodb.net/magic",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database is connected");
  } catch (error) {
    console.error(error);
  }
}

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

run();
