require('dotenv').config(); // Add dotenv to load environment variables
const UserModel = require('../models/loginSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists, please login.", success: false });
        }

        // Create new user
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 12); // Increase salt rounds

        // Save the user to the database
        await userModel.save();

        // Send response
        res.status(201).json({
            message: "Signup successful",
            success: true,
            name: userModel.name,
            email: userModel.email
        });
    } catch (error) {
        console.error(error); // Add error logging for better troubleshooting
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req, res) => {
     const secret ="anand@12345"
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Auth failed: email not found", success: false });
        }

        // Compare passwords
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(401).json({ message: "Auth failed: incorrect password", success: false });
        }

        // Generate JWT token
        const jwttoken = jwt.sign(
            { email: user.email, _id: user._id },
            secret,
            { expiresIn:'24h' } // Adjust expiration time as needed
        );

        // Send response
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwttoken,
            email,
            name: user.name
        });
    } catch (error) {
        console.error(error); // Add error logging for better troubleshooting
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
};
