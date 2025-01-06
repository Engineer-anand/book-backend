const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURL = 'mongodb+srv://anandadmin:admin@storeuserdata.obcfc.mongodb.net/<databaseName>?retryWrites=true&w=majority';

// Establish connection to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
})
    .then(() => console.log("Database connection established"))
    .catch((err) => console.error("Database connection error: ", err));

// Access the connection instance
const db = mongoose.connection;

// Event for when the database is successfully connected
db.on('connected', () => {
    console.log("Database is connected");
});

// Event for when the database gets disconnected
db.on('disconnected', () => {
    console.log("Database is disconnected");
});

// Event for handling errors
db.on('error', (err) => {
    console.error("An error occurred: ", err);
});

module.exports = db;
