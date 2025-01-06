const mongoose = require('mongoose');
// import {MongoDbURL} from './config.js'
// const mongoURL = 'mongodb://localhost:27017/aniDB';
mongoose.connect('mongodb://localhost:27017/bookstore');

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
    console.log("An error occurred: ", err);
});

module.exports = db;