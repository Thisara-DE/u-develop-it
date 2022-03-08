const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to the database
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

// express test (not needed after confirming express server connection)
// app.get('/', (req,res) => {
//     res.json({
//         message: 'Hello World!'
//     });
// });




// // GET all the candidates
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// })

// // GET a single candidate by ID
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err,row) => {
//     if(err) {
//         console.log(err);
//     } 
//     console.log(row);
// })

// // DELETE a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err,result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// })

// create a candidate
const sql = `INSERT INTO candidates (id, first_name, Last_name, industry_connected)
            VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronals', 'Firbank', 1];

db.query(sql,params,(err,result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
});







// Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});