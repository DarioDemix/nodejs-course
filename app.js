const path = require("path");
const express = require("express");

const { routes, products } = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

const port = 3000;

app.set("view engine", "pug");
app.set("views", "views"); // default is already views/

// parser
app.use(express.urlencoded({ extended: false }));

// serving static content
app.use(express.static(path.join(__dirname, `public`)));

app.use("/admin", routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, `views`, `page-not-found.html`));
});

app.listen(port);
console.log(`Server created at http://localhost:${port}`);
