const express = require("express");

const isAuth = require("../middleware/is-auth");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", isAuth, adminController.getDashboard);

router.get("/product", isAuth, adminController.getProducts);

router.get("/order-detail/:orderId", isAuth, adminController.getDetailOrder);

router.get(
  "/product-detail/:productId",
  isAuth,
  adminController.getDetailProduct
);

router.post("/product", isAuth, adminController.createProduct);

router.put("/product/edit/:productId", isAuth, adminController.updateProducts);

router.delete(
  "/product/delete/:productId",
  isAuth,
  adminController.deleteProduct
);

module.exports = router;
