const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productPath, JSON.stringify(products), (e) =>
        console.log(e)
      );
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, cb) {
    getProductsFromFile(products => cb(products.find(prod => prod.id === id)));
  }
};
