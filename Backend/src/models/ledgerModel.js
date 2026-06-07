const mongoose=require("mongoose");

const ledgerSchema=new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"Account related to the transaction should be given"],
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:[true,"Ammount in transactions should be mentioned in the ledger"],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",
        required:[true,"The transaction in which the ammount is transfered should be mentioned"],
        index:true,
        immutable:true
    },
    Type:{
        type:String,
        enum:{
            values:["CREDIT","DEBIT"],
            message:"the type of transaction"
        },
        required:[true,"The transaction type can be CREDIT or DEBIT"],
        immutable:true
    }
})

function preventLedgerModification(){
    throw new Error("Ledger entries are immutable");
}

ledgerSchema.pre("findOneAndUpdate",preventLedgerModification);
ledgerSchema.pre("updateOne",preventLedgerModification);
ledgerSchema.pre("deleteOne",preventLedgerModification);
ledgerSchema.pre("remove",preventLedgerModification);
ledgerSchema.pre("deleteMany",preventLedgerModification);
ledgerSchema.pre("updateMany",preventLedgerModification);
ledgerSchema.pre("findOneAndDelete",preventLedgerModification);
ledgerSchema.pre("findOneAndReplace",preventLedgerModification);

const Ledger=mongoose.model("Ledger",ledgerSchema);

module.exports={Ledger};