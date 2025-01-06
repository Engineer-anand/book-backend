const mongoose = require('mongoose');

// Define the schema for the books collection
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
       // Optional: Automatically trims spaces from the title
        },
        email: {
            type: String,
            required:true
      // Optional: Automatically trims spaces from the author's name
        },
        password: {
            type: String,
            required:true
        // Corrected: changed 'require' to 'required'
        }}
);

// Create and export the books model
const user= mongoose.model('user',userSchema);
module.exports = user;
