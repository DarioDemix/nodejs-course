const Cart = require('./Cart');
const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
   
  }

  static fetchAll() {
    return db.query('SELECT * FROM products');
  }

  static findById(id, cb) {
  }

  static deleteById(id, cb) {
   
  }
};
