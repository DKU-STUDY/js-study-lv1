const mysql = require('mysql');
const db_config = {
    host: 'localhost',
    port: '3306',
    user: '',      /* user name */
    password: '',  /* password */
    database: ''   /* schema name */
}

module.exports = {
    getConnection: function() {
        return mysql.createConnection(db_config);
    }
};

/**
 * // DB TABLE //
 * CREATE TABLE (
 *      seq INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 *      content VARCHAR(45) NOT NULL,
 *      highlight BOOLEAN NOT NULL,
 *      completed BOOLEAN NOT NULL.
 *      date DATE NOT NULL
 * );
 */
