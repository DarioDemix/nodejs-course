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
   return db.query(
      'INSERT INTO products (title, price, "imageUrl", description) VALUES ($1, $2, $3, $4)', // Prevent SQL Injection
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.query('SELECT * FROM products');
  }

  static findById(id, cb) {
    return db.query('SELECT * FROM products WHERE id = $1', [id]);
  }

  static deleteById(id, cb) {
   
  }
};
