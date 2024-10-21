const express = require ('express');
const app = express();
const dbSetup = require('./config/dbSetup');
require('dotenv').config();
const userRouter = require('./routes/user');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

dbSetup();



app.use('/user', userRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000 🚀🚀');
});
