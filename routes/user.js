const express = require('express');
const router = express.Router();
const {signupHandler , loginHandler} = require('../controller/userController');


router.get('/signup' , (req , res)=>{
    res.render('signup');
}
);
router.post('/signup' , signupHandler)

router.get('/login' , (req , res)=>{
    res.render('login');
}
);
router.post('/login' , loginHandler);

module.exports = router;