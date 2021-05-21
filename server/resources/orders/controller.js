const orderModel = require("./model")

exports.createOrder = async (req, res) => {
    const newOrder = {
        orderNumber: req.body.orderNumber,
        user: req.body.user,
        totalCost: req.body.totalCost,
        shipping: req.body.shipping,
        sent: req.body.sent,
        products: req.body.products,
        adress: req.body.adress
    }
    try {
        const order = await orderModel.create(newOrder);
        res.status(201).json({ message: 'Order successfully created!', order })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', error })

    }
}
exports.viewAllOrders = async (req, res,) => {
    try {
        const allOrders = await orderModel.find({})
        res.status(200).json({ message: 'Orders found!', allOrders })

    } catch (error) {
        res.status(400).json({ message: 'Something wikked went wrong!', error })
    }

}