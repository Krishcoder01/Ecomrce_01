const express = require('express');
const router = express.Router();
const {createPayment, verifyPayment} = require('../controller/paymentController');

const {isLoggedIn} = require('../middlewares/auth')


router.post('/:id' ,isLoggedIn , createPayment);
router.post('/' ,isLoggedIn , verifyPayment);

module.exports = router;