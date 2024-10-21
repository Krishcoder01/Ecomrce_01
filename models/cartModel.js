const mogoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true  // Optimized for querying by user
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        default: 0,
        min: [0, 'Total price cannot be negative']
    }
}, {timestamps: true});


const cartValidator = Joi.object({
    user: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error('Invalid user ID format');
            }
            return value;
        }),
    products: Joi.array().items(Joi.object({
        productId: Joi.string()
            .required()
            .custom((value, helpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.error('Invalid product ID format');
                }
                return value;
            }),
        quantity: Joi.number()
            .min(1)
            .required()
            .messages({
                'number.min': 'Quantity must be at least 1'
            })
    })).required(),
    totalPrice: Joi.number()
        .min(0)
        .optional()
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = {
    cartModel:Cart , cartValidator }; 