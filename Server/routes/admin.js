const express = require("express");

const isAdmin = require("../middleware/is-admin");
const isAuth = require("../middleware/is-auth");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", adminController.getDashboard);

router.get("/product", adminController.getProducts);

router.get("/order-detail/:orderId", adminController.getDetailOrder);

router.post("/product", adminController.createProduct);

router.put("/product/edit/:productId");

module.exports = router;
