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

//     let paymentDetails = await paymentModel.findOne({
//         orderId: req.params.orderid,
//       });
  
//       if (!paymentDetails) return res.send("Sorry, this order does not exist");
//       if (
//         req.params.signature === paymentDetails.signature &&
//         req.params.paymentid === paymentDetails.paymentId
//       ) {
//         let cart = await cartModel.findOne({ user: req.params.userid });
  
//         await orderModel.create({
//           orderId: req.params.orderid,
//           user: req.params.userid,
//           products: cart.products,
//           totalPrice: cart.totalPrice,
//           ,
//           payment: paymentDetails._id,
//         });
//         res.redirect(`/map/${req.params.orderid}`);
//       } else {
//         res.send("invalid payment");
//       }
// }








module.exports = { getOrder  , getOrderById  }