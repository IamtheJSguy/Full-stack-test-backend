const config = require('../../config');
module.exports = {
    TABLE_EXIST: `SELECT * FROM information_schema.tables WHERE table_schema = ${config.database} AND table_name = users`,
    CREATE_TABLE: `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), token VARCHAR(255))`,
    INSERT: `INSERT INTO users (name, email, password) values (?, ?, ?)`,
    UPDATE_TOKEN: `UPDATE users SET token = ? WHERE id = ?`,
    LIST: `SELECT * FROM users`,
    READ: `SELECT * FROM users WHERE id = ?`,
    FIND_BY_EMAIL: `SELECT * FROM users WHERE email = ?`,
    UPDATE: `UPDATE users SET name = ? WHERE id = ?`,
    DELETE: `DELETE from users WHERE id = ?`
}