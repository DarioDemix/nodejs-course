const path = require("path");
const rootDir = require("../util/path");

const { products } = require("./admin");

const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("shop", {
    products,
    docTitle: "My Shop",
    path: "/",
    hasProducts: products.length > 0,
  });
});

module.exports = router;
