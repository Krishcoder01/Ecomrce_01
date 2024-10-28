const express = require('express');
const router = express.Router();
const {createProduct , getProducts , getProductById , updateProduct , deleteProduct} = require('../controller/productController');
const {isAdmin , isLoggedIn} = require('../middlewares/auth');


router.get('/' , isLoggedIn , getProducts)
.post('/' , isAdmin , createProduct);

router.get('/:id' , isLoggedIn ,getProductById)

router.post('/update/:id' , isAdmin , updateProduct)

router.post('/remove' , deleteProduct);

module.exports = router;
