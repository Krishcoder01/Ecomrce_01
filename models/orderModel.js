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

const Order = mongoose.model('orders', orderSchema);