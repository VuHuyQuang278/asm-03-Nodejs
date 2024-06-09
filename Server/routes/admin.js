const express = require("express");

const isAdmin = require("../middleware/is-admin");
const isAuth = require("../middleware/is-auth");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/", adminController.getDashboard);

router.get("/product", adminController.getProducts);

module.exports = router;
