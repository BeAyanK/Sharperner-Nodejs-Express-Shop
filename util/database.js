const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node-demo",
    password: "akhan7890",
});

module.exports = pool.promise();
