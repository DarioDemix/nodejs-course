require('./env');
const { Sequelize } = require('sequelize');

const {
    PGUSER,
    PGPASSWORD,
    PGDATABASE,
    PGPORT
} = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, { 
    dialect: 'postgres',
    host: 'localhost',
    port: PGPORT
});

module.exports = sequelize;