const path = require("path");
const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require('./controllers/error-controller');
const navigationController = require('./controllers/navigation-controller');

const sequelize = require('./util/database');
const Product = require('./models/Product');
const User = require('./models/User');

const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views"); // default is already views/

// parser
app.use(express.urlencoded({ extended: false }));

// serving static content
app.use(express.static(path.join(__dirname, `public`)));

app.use(navigationController.setLinksMiddleware);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.getNotFound);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// Associations doesn't work if sequelize.sync is used. You need to use the sync method on the individual models.
Product.sync({ force: true })
    .then(() => User.sync({ force: true }))
    .then(() => {
        app.listen(port);
        console.log(`Server created at http://localhost:${port}`);
    });