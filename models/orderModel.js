const Joi = require('joi');
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentId: { 
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
     },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    
}, {
    timestamps: true
});


function orderValidator(data){

let schema = Joi.object({
    orderItems: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        qty: Joi.number().min(1).required().messages({
            'number.min': 'Quantity must be at least 1'
        }),
        image: Joi.string().required(),
        price: Joi.number().min(0).required().messages({
            'number.min': 'Price cannot be negative'
        }),
        product: Joi.string().required().custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('Invalid product ID format');
            }
            return value;
        })
    })).required(),
    shippingAddress: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required()
    }).required(),
    paymentId: Joi.string().optional().allow(null).custom((value, helpers) => {
        if (value && !mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('Invalid payment ID format');
        }
        return value;
    }),
    user: Joi.string().required().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('Invalid user ID format');
        }
        return value;
    }),
    totalPrice: Joi.number().min(0).required()
})
let {error} = schema.validate(data);
return error ? error.details[0].message : null;
};


const Order = mongoose.model('orders', orderSchema);

module.exports = { orderValidator, orderModel: Order };