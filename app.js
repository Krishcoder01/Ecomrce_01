const express = require ('express');
const app = express();
const dbSetup = require('./config/dbSetup');
require('dotenv').config();
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const path = require('path');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

dbSetup();


app.use('/user', userRouter);

app.use('/product', productRouter);



app.use((err,req , res , next)=>{
    console.log( "err  => " + err.message );
})


app.listen( process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000 🚀🚀');
});
