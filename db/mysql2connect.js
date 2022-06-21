var mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.MySQL,
  database: process.env.DATABASE,
});
module.exports = connection;