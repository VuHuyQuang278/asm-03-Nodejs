const express = require("express");
const { body } = require("express-validator/lib");

const User = require("../models/user");
const authController = require("../controllers/auth");
const isAdmin = require("../middleware/is-admin");

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
  ],
  authController.signup
);

router.post("/login", authController.login);

router.post("/admin-login", isAdmin, authController.login);

module.exports = router;
