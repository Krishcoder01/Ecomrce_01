const {userModel , userValidator} = require('../models/userModel');
const bcrypt = require('bcrypt')



async function signupHandler  (req , res , next){
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

    await userModel.create({
        email ,
        name,
        phone ,
        password : hashPassword
    }).then(res.send("User created sucessfully"))
        
    } catch (error) {
        next(error)
    }
}

async function loginHandler (req , res , next){
    try {
        const {email , password} = req.body;
        if( email== undefined || password== undefined  )
            return res.status(200).send("all details are required");

        const user = await userModel.findOne({email : email});
        if(!user) return res.status(400).send('User not registered');

        const validPassword = await bcrypt.compare(password , user.password);

        if(!validPassword) return res.status(400).send('Invalid email or password');

        res.send('Login sucessfull')
        
    } catch (error) {
        next(error)
    }
}

module.exports = {signupHandler , loginHandler}