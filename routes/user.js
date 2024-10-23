const express = require('express');
const router = express.Router();
const {signupHandler} = require('../controller/userController');


router.get('/signup' , (req , res)=>{
    res.render('signup');
}
);

router.post('/signup' , signupHandler)

module.exports = router;