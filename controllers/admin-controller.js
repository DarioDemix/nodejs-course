exports.getAdminProducts = (req, res, next) => {
  res.render("admin/products", {
    docTitle: "Admin Products",
    path: "/admin/products",
    links: req.links,
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    links: req.links,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title } = req.body;
  const product = new Product(title, 19.99, "Lorem ipsum");

  product.save();
  res.redirect("/");
};
