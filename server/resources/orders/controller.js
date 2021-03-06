const ProductModel = require("../products/model");
const orderModel = require("./model");

///// hämta jämför products med data basen och ändra stocken efter order ///////
exports.createOrder = async (req, res) => {
  let updateProducts = req.body.products;

  const allOrders = await orderModel.find({});

  let newOrderNumber = 0;
  allOrders.forEach((order) => {
    if (order.orderNumber > newOrderNumber) {
      newOrderNumber = order.orderNumber;
    }
  });
  newOrderNumber++;

  const newOrder = {
    orderNumber: newOrderNumber,
    userId: req.body.userId,
    user: req.body.user,
    totalCost: req.body.totalCost,
    shipping: req.body.shipping,
    sent: req.body.sent,
    products: req.body.products,
    adress: {
      street: req.body.adress.street,
      zipCode: req.body.adress.zipCode,
      city: req.body.adress.city,
    },
  };

  try {
    const order = await orderModel.create(newOrder);
    res.status(201).json({ message: "Order successfully created!", order });
    updateProductStock(updateProducts);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
};

exports.viewAllOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});
    res.status(200).json({ message: "Orders found!", allOrders });
  } catch (error) {
    res.status(400).json({ message: "Something wikked went wrong!", error });
  }
};

async function updateProductStock(orderProducts) {
  orderProducts.forEach(async (obj) => {
    if (obj.quantity >= 1) {
      const getProduct = await ProductModel.findById(obj.id);
      const updateProductStock = { stock: getProduct.stock - obj.quantity };

      if (getProduct) {
        await ProductModel.findByIdAndUpdate(
          { _id: obj.id },
          updateProductStock
        );
      } else console.log("No product stock updated ");
    }
  });
}
