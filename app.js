const http = require("http");

const express = require("express");

const app = express();

const port = 3000;

app.use((req, res, next) => {
  console.log("In the middleware");
  next(); // This allows the request to continuo to the next middleware in line
}); // add a middleware function

app.use((req, res, next) => {
  console.log("In another middleware");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(port);
console.log(`Server created at http://localhost:${port}`);
