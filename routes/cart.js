const express = require('express');
const router = express.Router();
const {getCart , addToCart , deleteCart} = require('../controller/cartController');
const { isLoggedIn } = require('../middlewares/auth');

router.get('/' , isLoggedIn , getCart)
.post('/add/:id' , isLoggedIn, addToCart)
.delete('/remove/:id' , deleteCart);

module.exports = router;