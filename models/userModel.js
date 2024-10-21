const mongoose = require('mongoose');

const Joi = require('joi');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email validation regex
            },
            message: 'Please enter a valid email'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10,15}$/.test(v); // Assumes phone numbers of length between 10 and 15 digits
            },
            message: 'Please enter a valid phone number'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


const userValidator = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email',
        'string.empty': 'Email is required'
    }),
    phone: Joi.string().pattern(/^\d{10,15}$/).required().messages({
        'string.pattern.base': 'Phone number must be between 10 and 15 digits',
        'string.empty': 'Phone number is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required'
    }),
    isAdmin: Joi.boolean().optional()
});


const User = mongoose.model('users', userSchema);

module.exports = { userValidator , userModel : User };