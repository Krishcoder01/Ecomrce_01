const mongoose = require('mongoose');
const Joi = require('joi');

const paymentSchema = new mongoose.Schema({
    transactionID: {
        type: String,
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
        trim: true
    },
    currency: {
        type: String,
        default: 'INR'
    }
}, { timestamps: true });

function transactionValidator(data){
    let schema = Joi.object({
    transactionID: Joi.string().trim().messages({
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
    signature: Joi.string().trim().messages({
        'string.empty': 'Signature is required',
        'any.required': 'Signature is required'
    })
})
 let {error} = schema.validate(data);
 return error ? error.details[0].message : null;
};


const Payment = mongoose.model('payments', paymentSchema);
module.exports = { transactionValidator , paymentModel : Payment };