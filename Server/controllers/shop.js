const Product = require("../models/product");

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
