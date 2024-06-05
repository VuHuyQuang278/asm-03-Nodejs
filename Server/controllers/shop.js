const Product = require("../models/product");
const Order = require("../models/order");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

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
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;

  let newCart = listCart.map((product) => {
    return {
      productId: product._id,
      quantity: product.quantity,
    };
  });

  try {
    const order = new Order({
      listCart: newCart,
      totalPrice,
      userId,
    });

    const result = await order.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "quangvhfx22065@funix.edu.vn",
        pass: "xioi sdta wlzv lqtm",
      },
    });

    const templatePath = path.resolve(__dirname, "..", "views");

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          partialsDir: templatePath,
          defaultLayout: false,
        },
        viewPath: templatePath,
        extName: ".hbs",
      })
    );

    const SENDMAIL = async (mailDetails, callback) => {
      try {
        const info = await transporter.sendMail(mailDetails);
        callback(info);
      } catch (error) {
        console.log(error);
      }
    };

    let newListCart = listCart.map((product) => {
      return {
        name: product.name,
        img: product.img1,
        price: `${product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`,
        quantity: product.quantity,
        totalPrice: `${(product.price * product.quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`,
      };
    });

    const options = {
      from: "BOUTIQUE <quangvhfx22065@funix.edu.vn>", // sender address
      to: email, // receiver email
      subject: "Đặt hàng thành công", // Subject line
      template: "main",
      context: {
        listCart: newListCart,
        fullName: fullName,
        phone: phone,
        address: address,
        totalPrice: `${totalPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`,
      },
    };

    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });

    // Trả lại phản hồi cho người dùng
    res.status(201).json({ message: "Order created!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
