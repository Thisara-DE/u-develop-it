const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes')
    
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// use api routes
app.use('/api', apiRoutes);



// express test (not needed after confirming express server connection)
// app.get('/', (req,res) => {
//     res.json({
//         message: 'Hello World!'
//     });
// });


// Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
});