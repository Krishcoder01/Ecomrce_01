const {paymentModel ,transactionValidator} = require('../models/paymentModel');
const {orderModel} = require('../models/orderModel');
const {cartModel} = require('../models/cartModel');
const razorpay = require('../config/razorPay');

async function createPayment(req , res , next){
    const cart = await cartModel.findOne({ user: req.user.id });
    console.log(cart);
    const options = {
        amount: (cart.totalPrice + 20 + 10) * 100, // amount in smallest currency unit
        currency: "INR",
      };
      console.log(options);
      try {
        const order = await razorpay.orders.create(options);
        // console.log(JSON.stringify(order) + "order");
  

        
        
        if (order && order.id && order.amount && order.currency + "check") {
          // Proceed with creating the payment only if order has required fields


          const newpayment = await paymentModel.create({
              transactionID: order.id,
              amount: order.amount,
              currency: order.currency,
              status: 'pending',

          })
          console.log(newpayment + "newpayment");
        
          res.send(order);
        }
        
      } catch (error) {
        res.status(500).send('Error creating order');
      }
}

async function verifyPayment(req , res , next){
    const { razorpayOrderId , razorpayPaymentId , signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET ;

    // console.log(razorpayOrderId , razorpayPaymentId , signature + " aya hu mai  ")
  
    try {
     
      const { validatePaymentVerification } = require('../node_modules/razorpay/dist/utils/razorpay-utils.js')
  
      const result = validatePaymentVerification({ "order_id": razorpayOrderId , "payment_id": razorpayPaymentId }, signature, secret );
      if (result) {
        const payment = await paymentModel.findOne({ transactionID: razorpayOrderId });
        payment.transactionID = razorpayPaymentId;
        payment.signature = signature;
        payment.status = 'success';
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