const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/auth')

const {getOrder , createOrder ,getOrderById } = require('../controller/orderController');

router.get('/', isLoggedIn , getOrder)
.post('/' , isLoggedIn , createOrder)

router.get('/:id' , isLoggedIn , getOrderById)


module.exports = router;
