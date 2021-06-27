const fs = require("fs");
const path = require("path");

const p = path.join(require("../util/path"), "data", "cart.json");

module.exports = class Cart {

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id,
          qty: 1,
        };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => err && console.log(err));
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) { return; }

      const updatedCart = { ...JSON.parse(fileContent) }
      const product = updatedCart.products.find(prod => prod.id === id);
      
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id); 
      updatedCart.totalPrice -= price * product.qty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => { if(err) console.log(err); })
    });
  }
};
