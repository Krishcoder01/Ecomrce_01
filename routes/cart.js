const express = require('express');
const router = express.Router();
const {getCart , addToCart , deleteCart} = require('../controller/cartController');

router.get('/' , getCart)
.post('/add/:id' , addToCart)
.delete('/remove/:id' , deleteCart);

module.exports = router;