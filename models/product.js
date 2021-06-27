const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const Cart = require('./Cart');

const productPath = path.join(rootDir, `data`, `products.json`);

const getProductsFromFile = (cb) => {
  fs.readFile(productPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    let productsToWrite; 

    getProductsFromFile((products) => {
      if(this.id) {

        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [ ...products ];
        updatedProducts[existingProductIndex] = this;

        productsToWrite = updatedProducts;
        
      } else {

        this.id = Math.random().toString();
        products.push(this);

        productsToWrite = products;
      }
      fs.writeFile(productPath, JSON.stringify(productsToWrite), (e) => console.log(e));
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, cb) {
    getProductsFromFile(products => cb(products.find(prod => prod.id === id)));
  }

  static deleteById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);

      const updatedProducts = products.filter(prod => prod.id !== id);
      if (updatedProducts.length === products.length) { return res.redirect('/404'); }

      fs.writeFile(productPath, JSON.stringify(updatedProducts), (e) => { 
        console.log(e);
        if(!e) {
          Cart.deleteProduct(id, product.price);
        }
      });
      cb();
    });
  }
};
