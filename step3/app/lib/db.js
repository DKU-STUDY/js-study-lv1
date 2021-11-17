const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yoon',
    password: 'tjrqls29',
    database: 'studydb',
    dateStrings: 'date'
});
module.exports.db = db;

