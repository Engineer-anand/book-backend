const { signup, login } = require('../controllers/AuthController');
// const {authRoute}=require('./AuthUserUpadte')
const { signupValidation, loginValidation } = require('../middelware/AuthMiddelware');  // Fixed typo in 'Validation' and 'Middleware'
const router = require('express').Router();  // Corrected initialization

// Simple login route (for testing purposes)
router.post('/login', loginValidation,login);
// Signup route with validation and controller
router.post('/signup', signupValidation, signup);
// router.put('/update', authRoute);
module.exports = router;
