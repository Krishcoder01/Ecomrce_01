const {paymentModel ,transactionValidator} = require('../models/paymentModel');
const {orderModel} = require('../models/orderModel');
const {cartModel} = require('../models/cartModel');
const razorpay = require('../config/razorPay');

async function createPayment(req , res , next){
    const cart = await cartModel.findOne({ user: req.user._id });
    const options = {
        amount: cart.totalPrice * 100, // amount in smallest currency unit
        currency: "INR",
      };
      try {
        const order = await razorpay.orders.create(options);
        res.send(order);
    
        const newPayment = await paymentModel.create({
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          status: 'pending',
        });
    
      } catch (error) {
        res.status(500).send('Error creating order');
      }
}

async function verifyPayment(req , res , next){
    const { razorpayOrderId , razorpayPaymentId , signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET ;
  
    try {
     
      const { validatePaymentVerification } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js')
  
      const result = validatePaymentVerification({ "order_id": razorpayOrderId , "payment_id": razorpayPaymentId }, signature, secret );
      if (result) {
        const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
        payment.transactionID = razorpayPaymentId;
        payment.signature = signature;
        payment.status = 'completed';
        await payment.save();
        res.json({ status: 'success' });
      } else {
        res.status(400).send('Invalid signature');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Error verifying payment');
    }
}


module.exports = { createPayment , verifyPayment };