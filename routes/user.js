const express = require('express');
const router = express.Router();
const {signupHandler , loginHandler ,adminLoginHandler , adminSignupHandler , logoutHandler} = require('../controller/userController');
const { isAdmin , isLoggedIn} = require('../middlewares/auth');
const {productModel} = require('../models/productModel');


router.get('/home' ,isLoggedIn, async (req , res)=> {
    const produscts = await productModel.find({});
    res.render('userHome' , {produscts});
}
);

router.get('/signup' , (req , res)=>{
    res.render('signup');
}
).post('/signup' , signupHandler) ;


router.get('/login' , (req , res)=>{
    res.render('login');
}
).post('/login' , loginHandler);

router.get('/logout' , logoutHandler)

router.get('/admin'  , (req , res)=>{
    res.render('adminLogin');
}
).post('/admin' , adminLoginHandler) ;


router.get('/admin/create'  , (req , res)=>{
    res.render('adminSignup');
}
).post('/admin/create' , adminSignupHandler )


router.get('/admin/dashboard' , isAdmin , (req , res)=>{
    res.render('adminDashboard');
}) ;


module.exports = router;