const Product = require("../models/product");
const Order = require("../models/order");

exports.getProductsTrending = async (req, res, next) => {
  try {
    const products = await Product.find();
    const topTrendingProducts = products.slice(0, 8);
    res.status(200).json({
      topTrendingProducts,
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
    res.status(200).json({
      products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  // Lấy dữ liệu từ request
  const listCart = req.body.listCart;
  const totalPrice = req.body.totalPrice;
  const userId = req.body.userId;

  try {
    const order = new Order({
      listCart,
      totalPrice,
      userId,
    });

    const result = await order.save();
    console.log(result);
    // Trả lại phản hồi cho người dùng
    res.status(201).json({ message: "Order created!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
