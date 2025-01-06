const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db=require('./db');
 // Assuming this connects to the database (MongoDB, MySQL, etc.)
 const authRoutes=require('./routes/AuthRouts')
//  const booksRoutes = require('./routes/booksRoutes');
//  const productRoutes = require('./routes/productRout');
const AuthUpdateUser =require('./routes/AuthUserUpadte')
const BooksApi =require('./routes/BooksApiRouts')
const app = express();

// Middleware for parsing JSON and handling CORS
app.use(bodyParser.json());
// Routes setup with appropriate prefixes
app.use(cors())
// app.use('/books', booksRoutes);
app.use('/', authRoutes);
// app.use('/products', productRoutes);
app.use('/update',AuthUpdateUser)
app.use('/search',BooksApi)
app.use('/book',BooksApi)
app.use('/want-to-read',BooksApi)


// Home route
app.listen(5000)