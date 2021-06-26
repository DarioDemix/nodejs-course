const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const productPath = path.join(rootDir, `data`, `products.json`);
module.exports = class Product {
  constructor(title, price, description) {
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save() {
    fs.readFile(productPath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(productPath, JSON.stringify(products), (e) =>
        console.log(e)
      );
    });
  }

  static fetchAll(callback) {
    fs.readFile(productPath, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }
};
