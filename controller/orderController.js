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

async function createOrder (req , res , next){

    // console.log("route pe ayaa")
    // console.log(req.body.response.config + " aja aja")
  try {
    
    const configData = JSON.parse(req.body.response.config.data);
    // console.log(configData)
    const razorpayOrderId = configData.razorpayPaymentId;
    const signature = configData.signature;
    // let { transactionId , signature } = req.body ;
    // console.log( razorpayOrderId + " 1st " + signature)
    const prepayment = await paymentModel.findOne({transactionID : razorpayOrderId , signature:signature});
    // console.log(prepayment + "payment dhundha")
    if(!prepayment) return res.status(400).send("Invalid transaction");
    let cart = await cartModel.findOne({user : req.user.id});
    // console.log(cart + "cart dhundha");
    if(!cart) return res.status(400).send("Cart not found");


    const productQuantities = {};
    cart.products.forEach(item => {
      productQuantities[item.productId.toString()] = item.quantity;
    });

    let productIds = cart.products.map((item => item.productId));

    let products = await productModel.find({_id : { $in : productIds }});
    console.log(products)
    let order = new orderModel({
        paymentId : prepayment._id, 
        user : req.user.id,  
        totalPrice : (prepayment.amount/100), 
        orderItems : products.map(product => {
                return {name : product.name,
                qty : productQuantities[product._id.toString()],
                image : product.image,
                price : product.price,
                product : product._id }
        }),
    });

    await order.save();
    await prepayment.updateOne({orderId : order._id})
    await prepayment.save();

    await cartModel.findOneAndDelete({user : req.user.id});

    console.log(" sab ho gaya r")

    return true ;
    // res.json({message : "Order created successfully" , order});
  } catch (error) {
    next(error);
  }
}








module.exports = { getOrder  , getOrderById , createOrder  }