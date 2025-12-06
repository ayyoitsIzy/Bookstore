const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "izy1234",
  database: "bookstore"
});

module.exports = pool;