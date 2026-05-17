const express=require('express');
const userRoutes=require('./routes/auth');
const accountRoutes=require('./routes/account');
const transactionRoutes=require("./routes/transaction");
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth',userRoutes);
app.use('/account',accountRoutes);
app.use("/transaction",transactionRoutes);
app.use((req,res)=>{
    res.status(404).json("Invalid Route");
})
module.exports=app;