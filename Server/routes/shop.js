const express = require("express");
const { body } = require("express-validator/lib");

const isAuth = require("../middleware/is-auth");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/top-trending", shopController.getProductsTrending);

router.get("/", shopController.getProducts);

router.put("/checkout", isAuth, shopController.postOrder);

module.exports = router;
