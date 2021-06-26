const express = require("express");

const adminController = require("../controllers/admin-controller");
const { getAddProduct, postAddProduct, getAdminProducts } = adminController;

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/products", getAdminProducts)

module.exports = router;
