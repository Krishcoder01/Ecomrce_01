const { orderModel , orderValidator} = require('../models/orderModel');
const { productModel } = require('../models/productModel');
const {paymentModel} =require('../models/paymentModel') ;
const { cartModel } = require('../models/cartModel');

async function getOrder (req , res , next){
    try {
        let user = req.user ; 
        let orders = await orderModel.find({ user : user._id });
        res.json(orders);
    } catch (error) {
        next(error);
    }
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

// async function createOrder (req , res , next){

//     try {

//         const user = req.user;
//         const cart = await cartModel.findOne({user : user._id});
//         if(!cart) return res.status(404).send("Cart not found");
//         if(cart.products.length == 0) return res.status(400).send("Cart is empty");
//         let products = [];
//         let totalPrice = 0;
//         for(let item of cart.products){
//             let product = await productModel.findById(item.productId);
//             if(!product) return res.status(404).send("Product not found");
//             totalPrice += product.price * item.quantity;
//             products.push({
//                 name : product.name,
//                 qty : item.quantity,
//                 image : product.image,
//                 price : product.price,
//                 product : product._id
//             });
//         }
//         let newOrder = await orderModel.create({
//             user : user._id,
//             orderItems : products , totalPrice ,
//             shippingAddress : req.body.shippingAddress, 
//         });
         
//         let payment = await paymentModel.create({
//             user : user._id,
//             order : newOrder._id,
//             amount : newOrder.totalPrice,
//             status : "pending"
//         });



//         await cartModel.findByIdAndDelete(cart._id);

//         res.json(newOrder);
//     }
//     catch (error) {
//         next(error);
//     }
// }








module.exports = { getOrder , createOrder , getOrderById  }