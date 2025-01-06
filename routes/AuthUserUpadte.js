const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('./../models/loginSchema');

// Middleware for validating request body
const validateRequestBody = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is empty or invalid' });
    }
    next();
};

// PUT route to update user by email
router.put('/:email', validateRequestBody, async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if the new email already exists in the database (but only if email is changed)
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser.email !== req.params.email) {
                return res.status(400).json({ message: 'Email already in use by another user' });
            }
        }

        // Hash the password if it exists in the request body
        if (password) {
            const saltRounds = 12; // Number of salt rounds for bcrypt
            req.body.password = await bcrypt.hash(password, saltRounds);
        }

        // Perform the update using findOneAndUpdate to update by email
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email }, // Use email from URL parameter
            { name, email: req.body.email, password: req.body.password }, // Update name, email, and password (if provided)
            { new: true, runValidators: true } // Return the updated document and validate
        );

        // Handle user not found
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser, // Optionally include updated user data (excluding sensitive info like password)
        });
    } catch (error) {
        // Differentiating between validation and server errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.message });
        }
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
