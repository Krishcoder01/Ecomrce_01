const { orderModel , orderValidator} = require('../models/orderModel');
const { productModel } = require('../models/productModel');

async function getOrder (req , res , next){
    try {
        let user = req.user ; 
        let orders = await orderModel.find({ user : user._id });
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

async function createOrder (req , res , next){

    //Karna baki hai

    
    // // orderItems: [{
    // //     name: 
    // //     qty: 
    // //     image: 
    // //     price: 
    // //     product: {
    // //         type: mongoose.Schema.Types.ObjectId,
    // //         ref: 'Product',
    // //         required: true
    // //     }
    // // }],
    // // shippingAddress: {
    // //     address: 
    // //     city: 
    // //     postalCode: 
    // //     country: 
    // // },
    // // paymentId: { 
    // //     type : mongoose.Schema.Types.ObjectId,
    // //     ref: 'Payment',
    // //  },
    
    // // user: {
    // //     type: mongoose.Schema.Types.ObjectId,
    // //     ref: 'User',
    // //     required: true
    // // },
    // // totalPrice: {
    // //   
    // // },
    // try {
    //     const {products , totalPrice} = req.body;
    //     if( products == undefined || totalPrice == undefined )
    //         return res.status(200).send("all details are required");
        
    //     const error = await orderValidator({products , totalPrice});
    //     if(error) return res.status(400).send(error);
        
    //     let newOrder = await orderModel.create({
    //         products , totalPrice
    //     });
    //     res.json(newOrder);
    // } catch (error) {
    //     next(error);
    // }
}


async function getOrderById (req , res , next){
    try {
        let order = await orderModel.findById(req.params.id);
        if(!order) return res.status(404).send("Order not found");
        res.json(order);
    } catch (error) {
        next(error);
    }
}




module.exports = { getOrder , createOrder , getOrderById  }