const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

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

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "../views/",
      defaultLayout: false,
      partialsDir: "../views/",
    },
    viewPath: "../views/",
    extName: ".hbs",
  })
);

module.exports.SENDMAIL = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback(info);
  } catch (error) {
    console.log(error);
  }
};
