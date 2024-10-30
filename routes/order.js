const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/auth')

const {getOrder  ,getOrderById , createOrder  } = require('../controller/orderController');

router.get('/', isLoggedIn , getOrder)
.post('/createOrder' , isLoggedIn , createOrder)

router.get('/:id' , isLoggedIn , getOrderById)


module.exports = router;
