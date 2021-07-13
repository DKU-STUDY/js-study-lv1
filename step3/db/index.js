
const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '32518458',
    database : 'my_db'
  });

connection.connect();

module.exports = connection;
