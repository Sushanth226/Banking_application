const express=require('express');
const userRoutes=require('./routes/auth');
const accountRoutes=require('./routes/account');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth',userRoutes);
app.use('/account',accountRoutes);

module.exports=app;