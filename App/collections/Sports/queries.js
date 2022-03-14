const config = require('../../config');
module.exports = {
    TABLE_EXIST: `SELECT * FROM information_schema.tables WHERE table_schema = ${config.database} AND table_name = sports`,
    CREATE_TABLE: `CREATE TABLE sports (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), icon VARCHAR(255), decathlonId VARCHAR(255), userId INT)`,
    INSERT: `INSERT INTO sports (name, icon, decathlonId, userId) values (?, ?, ?, ?)`,
    LIST: `SELECT * FROM sports`,
    LIST_MY_SPORTS: `SELECT * FROM sports WHERE userId = ?`,
    READ: `SELECT * FROM sports WHERE id = ?`,
    UPDATE: `UPDATE sports SET name = ? WHERE id = ?`,
    DELETE: `DELETE from sports WHERE id = ?`
}