const express = require("express");

const productsController = require("../controllers/products-controller");
const { getAddProduct, postAddProduct } = productsController;

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

module.exports = router;
