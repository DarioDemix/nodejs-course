const Product = require("../models/product");
const Cart = require('../models/Cart');

function fetchProdsAndRender(req, res, {viewToRender, pageTitle, path}) {
  Product.fetchAll().then(({ rows }) => {
    res.render(viewToRender, {
      products: rows,
      pageTitle,
      path,
      links: req.links,
    });
  })
  .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  fetchProdsAndRender(req, res, {
    viewToRender: "shop/product-list",
    pageTitle: "My Shop",
    path: "/products"
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      pageTitle: `${product.title} detail`,
      product,
      path: '/products',
      links: req.links
    })
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll().then(products => {
      const cartProducts = []
      products.forEach(product => {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      });
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProducts,
        links: req.links,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart')
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, product => Cart.deleteProduct(productId, product.price));
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
    links: req.links,
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    links: req.links,
  });
};

exports.getIndex = (req, res, next) => {
  fetchProdsAndRender(req, res, {
    viewToRender: "shop/index",
    pageTitle: "Shop",
    path: "/"
  });
};
