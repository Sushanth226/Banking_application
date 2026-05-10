const express=require('express');
const userRoutes=require('./routes/auth');
const app=express();
app.use(express.json());
app.use('/auth',userRoutes);

module.exports=app;