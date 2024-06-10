const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const Session = require("../models/session");

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

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getDetailOrder = async (req, res, next) => {
  // Lấy id của order cần hiển thị
  const orderId = req.params.orderId;

  try {
    const detailOrder = await Order.findById(orderId)
      .populate("userId")
      .populate("listCart.productId")
      .exec();

    // Trả lại phản hồi cho người dùng
    res.status(200).json(detailOrder);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
