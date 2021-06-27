require('./env');
const Sequelize = require('sequelize');

const {
    PGUSER,
    PGPASSWORD,
    PGDATABASE,
} = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, { 
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;