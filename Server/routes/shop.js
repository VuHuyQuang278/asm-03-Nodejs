const express = require("express");
const { body } = require("express-validator/lib");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/top-trending", shopController.getProductsTrending);

module.exports = router;
