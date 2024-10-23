const mongoose = require('mongoose');
const Joi = require('joi');

const paymentSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        required: [true, 'Transaction ID is required'],
        trim: true
    },
    amount: {
        type: Number,
        min: [0, 'Amount must be a positive number'],
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        required: [true, 'Status is required'],
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: [true, 'Order ID is required'],
    },
    signature: {
        type: String,
        required: [true, 'Signature is required'],
        trim: true
    }
}, { timestamps: true });

const transactionValidator = Joi.object({
    transactionID: Joi.string().trim().required().messages({
        'string.empty': 'Transaction ID is required',
        'any.required': 'Transaction ID is required'
    }),
    amount: Joi.number().positive().required().messages({
        'number.base': 'Amount must be a number',
        'number.positive': 'Amount must be positive',
        'any.required': 'Amount is required'
    }),
    status: Joi.string().valid('success', 'failed').required().messages({
        'any.only': 'Status must be either success or failed',
        'any.required': 'Status is required'
    }),
    orderId: Joi.string().required().messages({
        'string.empty': 'Order ID is required',
        'any.required': 'Order ID is required'
    }),
    signature: Joi.string().trim().required().messages({
        'string.empty': 'Signature is required',
        'any.required': 'Signature is required'
    })
});


const Payment = mongoose.model('payments', paymentSchema);
module.exports = { transactionValidator , paymentModel : Payment };