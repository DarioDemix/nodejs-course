const Product = require("../models/Product");

exports.getAdminProducts = (req, res, next) => {
  req.user.getProducts().then(products => {
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

  req.user.createProduct({
    title,
    imageUrl,
    price,
    description,
    userId: req.user.id
  }).then(result => {
    console.log("Created!"); 
    res.redirect("/admin/products");
  })
  .catch(err => err && console.log(err));

};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;
  const { edit } = req.query

  if (!Boolean(edit)) res.redirect('/');

  req.user.getProducts({ where: { id: productId } })
    .then(products => {
      const [ product ] = products;

      !product && res.redirect('/');

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
  
  Product.update({ productId, title, price, description, imageUrl }, { where: { id: productId } })
    .then(data => { 
      console.log("Updated!");

      res.redirect("/admin/products");
    });

};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.destroy({where: { id: productId }})
    .then(() => {
      res.redirect("/admin/products");
    });
};
