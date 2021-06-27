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
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    links: req.links,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);

  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;
  const { edit } = req.query

  if (!Boolean(edit)) res.redirect('/');

  Product.findById(productId, product => {
    res.render("admin/edit-product", {
      pageTitle: `Edit ${product.title}`,
      path: "/admin/edit-product",
      links: req.links,
      editing: edit,
      product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, description, imageUrl } = req.body
  const updatedProduct = new Product(productId, title, imageUrl, description, price);
  updatedProduct.save();
  res.redirect("/admin/products");
}
