const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, description } = req.body;
  products.push({ title, price, description });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    products,
    docTitle: "My Shop",
    path: "/",
  });
};

exports.products = products;
