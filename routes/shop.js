const express = require("express");

const router = express.Router();

const productsController = require('../controllers/products-controller');
const { getProducts } = productsController;

router.get("/", getProducts);

module.exports = router;
