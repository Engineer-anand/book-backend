const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Assuming this connects to the database
const authRoutes = require('./routes/AuthRouts');
const AuthUpdateUser = require('./routes/AuthUserUpadte');
const BooksApi = require('./routes/BooksApiRouts');

const app = express();
const PORT =  3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', authRoutes);
app.use('/update', AuthUpdateUser);
app.use('/search', BooksApi);
app.use('/book', BooksApi);
app.use('/want-to-read', BooksApi);

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server after database connection
db.once('open', () => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

db.on('error', (err) => {
    console.error('Database connection error:', err);
});
