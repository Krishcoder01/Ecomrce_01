const express = require('express');
const router = express.Router();
const {createPayment, verifyPayment} = require('../controller/paymentController');

const {isLoggedIn} = require('../middlewares/auth')


router.post('/order' ,isLoggedIn , createPayment);
router.post('/verify' ,isLoggedIn , verifyPayment);

module.exports = router;