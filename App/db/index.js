const mySql = require('mysql');

const config = require('../config/index');

const connection = mySql.createConnection(config);
connection.connect();

module.exports = connection;