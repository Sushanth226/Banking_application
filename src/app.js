const express=require('express');
const userRoutes=require('./routes/auth');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth',userRoutes);

module.exports=app;