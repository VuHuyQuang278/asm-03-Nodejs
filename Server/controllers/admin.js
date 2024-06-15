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

exports.getDetailProduct = async (req, res, next) => {
  // Lấy id của order cần hiển thị
  const productId = req.params.productId;

  try {
    const detailProduct = await Product.findById(productId);

    // Trả lại phản hồi cho người dùng
    res.status(200).json(detailOrder);
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

exports.createProduct = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const shortDesc = req.body.shortDesc;
  const longDesc = req.body.longDesc;
  const img1 =
    "http://localhost:5000/" + req.files.img1[0].path.replace(/\\/g, "/");
  const img2 =
    "http://localhost:5000/" + req.files.img2[0].path.replace(/\\/g, "/");
  const img3 =
    "http://localhost:5000/" + req.files.img3[0].path.replace(/\\/g, "/");
  const img4 =
    "http://localhost:5000/" + req.files.img4[0].path.replace(/\\/g, "/");

  const product = new Product({
    name,
    price,
    category,
    quantity,
    short_desc: shortDesc,
    long_desc: longDesc,
    img1,
    img2,
    img3,
    img4,
  });

  try {
    await product.save();
    res.status(201).json({
      message: "Product created successfully!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateProducts = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const shortDesc = req.body.shortDesc;
  const longDesc = req.body.longDesc;

  try {
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", "public", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
