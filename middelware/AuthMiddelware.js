const joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),  // Corrected email validation
        password: joi.string().min(4).max(15).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(err => err.message).join(', ');  // Format error messages
        return res.status(400).json({ message: "Bad request", error: errorMessage });
    }

    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),  // Corrected email validation
        password: joi.string().min(4).max(15).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(err => err.message).join(', ');  // Format error messages
        return res.status(400).json({ message: "Bad request", error: errorMessage });
    }

    next();
};

module.exports = {
    loginValidation,
    signupValidation
};
