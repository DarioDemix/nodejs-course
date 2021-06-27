const express = require("express");

const adminController = require("../controllers/admin-controller");
const { 
    getAddProduct,
    postAddProduct,
    getAdminProducts,
    getEditProduct,
    postEditProduct
} = adminController;

const router = express.Router();

router.get("/products", getAdminProducts);

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct)

module.exports = router;
