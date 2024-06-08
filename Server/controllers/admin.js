const User = require("../models/user");
const Order = require("../models/order");

exports.getDashboard = async (req, res, next) => {
  try {
    const users = await User.find();
    const userNum = users.length;

    const orders = await Order.find().populate("userId").exec();

    const earnings = orders.reduce((accumulator, order) => {
      return accumulator + order.totalPrice;
    }, 0);

    const orderNum = orders.length;
    res.status(200).json({
      clients: userNum,
      earnings,
      orderNum,
      orders,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
