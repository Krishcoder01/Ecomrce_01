const express = require('express');
const router = express.Router();
const {signupHandler , loginHandler ,adminLoginHandler , adminSignupHandler} = require('../controller/userController');


router.get('/signup' , (req , res)=>{
    res.render('signup');
}
).post('/signup' , signupHandler) ;

router.get('/login' , (req , res)=>{
    res.render('login');
}
).post('/login' , loginHandler);

router.get('/admin' , (req , res)=>{
    res.render('adminLogin');
}
).post('/admin' , adminLoginHandler) ;

router.post('/admin/create' , adminSignupHandler )

module.exports = router;