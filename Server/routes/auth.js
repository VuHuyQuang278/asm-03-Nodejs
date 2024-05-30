const express = require("express");
const { body } = require("express-validator/lib");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("fullName").trim().not().isEmpty(),
    body("phone").trim().isEmpty().withMessage("Invalid phone number!"),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
