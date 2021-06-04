const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const productRouter = require("./resources/products/routes");
const orderRouter = require("./resources/orders/routes");

const auth = require("./resources/auth/routes");
const userRouter = require("./resources/users/routes");
const shippingRouter = require("./resources/shipping/routes");
const categoryRouter = require("./resources/categories/routes");
const imageRouter = require("./resources/images/routes");

// This three always on TOP!!!
const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
//

app.use(cookieParser());

// Imports the routes for the resources
app.use(productRouter);
app.use(auth);
app.use(userRouter);
app.use(categoryRouter);
app.use(orderRouter);
app.use(shippingRouter);
app.use(imageRouter);

async function run() {
  try {
    await mongoose.connect(
      "mongodb+srv://Nicklas:qwerty123@cluster0.0tiz6.mongodb.net/magic",
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
