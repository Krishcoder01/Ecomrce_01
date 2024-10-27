const express = require('express');
const router = express.Router();
const {signupHandler , loginHandler ,adminLoginHandler , adminSignupHandler , logoutHandler} = require('../controller/userController');
const { isAdmin} = require('../middlewares/auth');


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