const {userModel , userValidator} = require('../models/userModel');
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken');



async function signupHandler  (req , res , next){
    try {
        const {email , name , phone , password , isAdmin} = req.body;

    if( email == undefined || name == undefined || phone== undefined || password== undefined  )
        return res.status(200).send("all details are required");

    const user = await userModel.findOne({email : email});
    if(user) return res.status(400).send('User already registered');
     
    const salt = await bcrypt.genSalt(10);
    // console.log(salt)
    const hashPassword = await  bcrypt.hash(password , salt) ;
    // console.log(hashPassword)

    const  error = await userValidator({email , name , phone , password , isAdmin});
    if (error) return res.status(400).send(error);

    let  newUser = await userModel.create({
        email ,
        name,
        phone ,
        password : hashPassword
    });

    let token = await Jwt.sign({id : newUser._id , email : newUser.email , isAdmin : newUser.isAdmin} , process.env.JWT_SECRET , {expiresIn : '1h'}) ;

    
    res.cookie('token' , token , {httpOnly : true , maxAge : 1000*60*60});
    
    res.send("User created sucessfully")
        
    } catch (error) {
        next(error)
    }
}

async function loginHandler (req , res , next){

    try {

        if(req.cookies?.token) return res.status(400).send('User already logged in');

        const {email , password} = req.body;
        if( email== undefined || password== undefined  )
            return res.status(200).send("all details are required");

        const user = await userModel.findOne({email : email});
        if(!user) return res.status(400).send('User not registered');

        const validPassword = await bcrypt.compare(password , user.password);

        if(!validPassword) return res.status(400).send('Invalid email or password');
         

        let token = await Jwt.sign({id : user._id , email : user.email , isAdmin : user.isAdmin} , process.env.JWT_SECRET , {expiresIn : '1h'}) ;
        res.cookie('token' , token , {httpOnly : true , maxAge : 1000*60*60});
        

        res.send('Login sucessfull')

    } catch (error) {
        next(error)
    }
}

async function adminLoginHandler (req , res , next){
    try {
        if(req.cookies?.token) return res.status(400).send('User already logged in');
        const {email , password} = req.body;
        if( email== undefined || password== undefined )
            return res.status(200).send("all details are required");

        const user = await userModel.findOne({email : email});
        if(!user) return res.status(400).send('User not registered');

        const validPassword = await bcrypt.compare(password , user.password);

        if(!validPassword) return res.status(400).send('Invalid email or password');
        if(user.isAdmin == false ) return res.status(400).send('User is not admin');
        
        let token = await Jwt.sign({id : user._id , email : user.email , isAdmin : user.isAdmin} , process.env.JWT_SECRET , {expiresIn : '1h'}) ;
        res.cookie('token' , token , {httpOnly : true , maxAge : 1000*60*60});
        
        res.redirect('/user/admin/dashboard')
        
    } catch (error) {
        next(error)
        
    }
}

async function adminSignupHandler (req , res , next){
    try {
        const {email , name , phone , password , isAdmin} = req.body;

        if( email== undefined || name == undefined || phone== undefined||password== undefined  )
            return res.status(200).send("all details are required");

        const user = await userModel.findOne({email : email});
        if(user) return res.status(400).send('User already registered');
         
        const salt = await bcrypt.genSalt(10);
        // console.log(salt)
        const hashPassword = await  bcrypt.hash(password , salt) ;
        // console.log(hashPassword)

        const  error = await userValidator({email , name , phone , password , isAdmin});
        if (error) return res.status(400).send(error);

        let  newUser = await userModel.create({
            email ,
            name,
            phone ,
            password : hashPassword,
            isAdmin : true
        });

        let token = await Jwt.sign({id : newUser._id , email : newUser.email , isAdmin : newUser.isAdmin} , process.env.JWT_SECRET , {expiresIn : '1h'}) ;

        
        res.cookie('token' , token , {httpOnly : true , maxAge : 1000*60*60});
        
        res.send("Admin created sucessfully")
    } catch (error) {
        next(error)
    }
}

async function logoutHandler (req , res , next){
    try {
        res.clearCookie('token');
        res.send('Logout sucessfull')
    } catch (error) {
        next(error)
    }
    
}




module.exports = {
    signupHandler , loginHandler , adminLoginHandler , adminSignupHandler , logoutHandler
} ;