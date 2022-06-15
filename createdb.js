// LINK UTILE https://www.renzocappelli.com/javascript/nodejs-realizzare-api-con-express-e-mysql/

require('dotenv').config();
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MySQL
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});