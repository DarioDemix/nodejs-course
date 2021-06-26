const express = require("express");

const productsController = require("../controllers/products");
const { getAddProduct, postAddProduct } = productsController;

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

module.exports = router;
