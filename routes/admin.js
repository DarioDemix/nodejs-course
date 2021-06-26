const path = require("path");
const rootDir = require("../util/path");
const express = require("express");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
});

router.post("/add-product", (req, res, next) => {
  const { title, price, description } = req.body;
  products.push({ title, price, description });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
