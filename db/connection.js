// connect to the database
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        password: '6e0*kXsaIn@^**Sc',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;