const path = require("path");
const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require('./controllers/error');

const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views"); // default is already views/

// parser
app.use(express.urlencoded({ extended: false }));

// serving static content
app.use(express.static(path.join(__dirname, `public`)));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.getNotFound);

app.listen(port);
console.log(`Server created at http://localhost:${port}`);
