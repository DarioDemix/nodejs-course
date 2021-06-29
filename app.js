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

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user.dataValues;
        next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.getNotFound);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// Associations doesn't work if sequelize.sync is used. You need to use the sync method on the individual models.
Promise.all([Product.sync(), User.sync()])
    .then(() => User.findByPk(1))
    .then(user => {
        if (!user) { 
            return User.create({ name: 'Dario', email: 'test@testmail.io'});
        }
        return Promise.resolve(user);    
    })
    .then(user => {

        console.log(user.dataValues);

        app.listen(port);
        console.log(`Server created at http://localhost:${port}`);
    })
    .catch(err => console.log(err));