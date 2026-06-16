const express=require('express');
const userRoutes=require('./routes/auth');
const accountRoutes=require('./routes/account');
const transactionRoutes=require("./routes/transaction");
const cookieParser=require('cookie-parser');
const cors = require('cors');
const app=express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/auth',userRoutes);
app.use('/account',accountRoutes);
app.use("/transaction",transactionRoutes);
app.use((req,res)=>{
    res.status(404).json("Invalid Route");
})
module.exports=app;