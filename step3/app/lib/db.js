const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tjrqls29',
    database: 'studydb'
});
db.connect();
module.exports.db = db;