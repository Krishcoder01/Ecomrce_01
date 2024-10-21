const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        enum : ['success', 'failed'],
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    signature: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Payment = mongoose.model('payments', paymentSchema);