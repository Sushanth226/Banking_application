const mongoose=require("mongoose");

const transactionSchema=new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.type,
        ref:"Account",
        required:[true,"The from account should be provided"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.type,
        ref:"Account",
        required:[true,"The to account should be provided"],
        index:true
    },
    status:{
        type:string,
        enum:{
            values:["PENDING","COMPLETE","FAILED","REVERSED"],
            message:"Status can be PENDING,COMPLETE,FAILED,REVERSED",
        },
        default:"PENDING"
    },
    amount:{
        type:number,
        required:[true,"The amount involved in the transaction is needed"],
        min:[0,"The min amount for the transaction is 0 INR"]
    },
    idempotencykey:{
        type:string,
        required:[true,"Client side generates"],
        index:true,
        unique:true
    }
},{
    timestamps:true
})

const transactionModel=mongoose.model("Transaction",transactionSchema);

module.exports={transactionModel};
