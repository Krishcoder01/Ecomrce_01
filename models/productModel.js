const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantityStock: {
        type: Number,
        required: true
    } ,
    image : {
        type: Buffer,
    }
} , {timestamps: true});

const User = mongoose.model('products', productSchema);
