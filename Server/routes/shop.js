const express = require("express");

const isAuth = require("../middleware/is-auth");
const shopController = require("../controllers/shop");
const { route } = require("./auth");

const router = express.Router();

router.get("/top-trending", shopController.getProductsTrending);

router.get("/", shopController.getProducts);

router.put("/checkout", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getDetailOrder);

router.get("/admin", shopController.getAdmin);

module.exports = router;
