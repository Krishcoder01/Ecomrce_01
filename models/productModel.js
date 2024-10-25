const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    quantityStock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock quantity cannot be negative']
    },
    image: {
        type: Buffer, // You may want to change this to store image URLs
    }
}, {timestamps: true});



const productValidator = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Product name is required'
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    description: Joi.string().trim().required().messages({
        'string.empty': 'Description is required'
    }),
    quantityStock: Joi.number().integer().min(0).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Stock quantity cannot be negative',
        'any.required': 'Stock quantity is required'
    }),
    image: Joi.any().optional() // Assuming you're handling image uploads separately
});



const Product = mongoose.model('products', productSchema);

module.exports = { productValidator , productModel : Product };