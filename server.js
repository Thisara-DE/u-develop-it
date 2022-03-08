const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');

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




// GET all the candidates
app.get('/api/candidates', (req,res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


// GET a single candidate by ID
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err,row) => {
        if(err) {
            res.status(400).json({ error: err.message});
            return
        } 
        res.json({
            message: 'success',
            data: row
        });
    });
});



// DELETE a candidate
app.delete('/api/candidate/:id', (req,res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err,result) => {
        if(err) {
            res.statusMessage(400).json({ error: res.message});
        } else if(!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }        
    });
});



// create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
            VALUES (?, ?, ?)`; 
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql,params,(err,result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });        
    });
});











// Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});