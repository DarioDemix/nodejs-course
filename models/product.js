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
};
