const { validationResult } = require("express-validator/lib");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  // Sử dụng validationResult để thu thập các lỗi
  const errors = validationResult(req);

  // Kiểm tra xem có lỗi nào không, nếu có thì xử lý lỗi
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  // Hàm tạo userName từ trường fullName
  const createUserName = (fullName) => {
    const arrName = fullName.split(" ");
    // Lấy chữ cái đầu của tên
    const nameUser = arrName[arrName.length - 1];
    // Lấy chữ cái đầu của các phần còn lại của họ tên và nối lại
    const sureNameUser = arrName
      .slice(0, arrName.length - 1)
      .map((t) => t.charAt(0))
      .join("");
    // Kết hợp chữ cái đầu của tên và phần còn lại của họ tên
    const userName = nameUser + sureNameUser;
    return userName;
  };

  // Lấy dữ liệu từ request
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const userName = createUserName(fullName);

  try {
    // Sử dụng thư viện bcrypt để mã hõa password
    const hashedPw = await bcrypt.hash(password, 12);

    // Khởi tạo user
    const user = new User({
      userName,
      password: hashedPw,
      fullName,
      phone,
      email,
      role: "client",
      cart: { items: [] },
    });

    // Lưu user xuống database
    const result = await user.save();
    // Trả lại phản hồi cho người dùng
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  // Lấy dữ liệu từ request
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  try {
    // Tìm kiếm user với email đã cho
    const user = await User.findOne({ email: email });
    // Nếu không tìm thấy thì trả về lỗi
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;

    // Sử dụng thư viện bcrypt để kiểm tra mật khẩu
    const isEqual = await bcrypt.compare(password, user.password);
    // Nếu mật khẩu không giống nhau thì thông báo lỗi
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    // Nếu mật khẩu giống nhau thì tạo token và trả lại phản hồi cho người dùng
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, user: loadedUser });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
