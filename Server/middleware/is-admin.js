const User = require("../models/user");

module.exports = async (req, res, next) => {
  const email = req.body.email;

  try {
    // Tìm kiếm user với email đã cho
    const user = await User.findOne({ email: email });
    // Nếu không tìm thấy thì trả về lỗi
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    // Kiểm tra người đăng nhập có phải admin hay tư vấn viên không
    if (user.role === "client") {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
