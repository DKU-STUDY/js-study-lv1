const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: '',           /* user name */
    password: '',       /* password */
    database: '',       /* database */
    dateStrings: 'date'
});

module.exports = pool;

/**
 * // DB TABLE //
 * CREATE TABLE new_table (
 *      id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 *      content VARCHAR(45) NOT NULL,
 *      highlight BOOLEAN NOT NULL,
 *      isComplete BOOLEAN NOT NULL,
 *      selected BOOLEAN NOT NULL,
 *      date DATE NOT NULL
 * );
 */

