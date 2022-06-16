// LINK UTILE https://www.renzocappelli.com/javascript/nodejs-realizzare-api-con-express-e-mysql/
// LINK TUTORIAL MYSQL2 https://www.npmjs.com/package/mysql2

require('dotenv').config();
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: "localhost",
    user:  process.env.USER,
    password: process.env.MySQL,
    database: process.env.DATABASE
});

// CONNECTION EXAMPLE WITH CONSOLE LOG CONNECTED
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query(
    'SELECT * FROM `test-table`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
/* // simple query
connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
  
  // with placeholder
  connection.query(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Page', 45],
    function(err, results) {
      console.log(results);
    }
  ); */