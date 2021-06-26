const Product = require("../models/product");

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      links: req.links,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    links: req.links,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);

  product.save();
  res.redirect("/");
};
