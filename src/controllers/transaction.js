const transactionModel=require("../models/transactionModel");
const ledgerModel=require("../models/ledgerModel");
const accountModel=require("../models/accountModel");
const mongoose=require("mongoose");
const email=require("../services/gmails");
/*
step(10) transaction flow:
1.Validate request.
2.Validate idempotencyKey.
3.check account status.
4.Derive sender balance from the ledger.
5.Create Transaction(Default:PENDING).
6.Create Debit ledger entry.
7.Create Credit ledger entry.
8.Mark transaction Completed.
9.Commit MongoDB session.
10.Send email notification.
*/

async function createTransaction(req,res){
    
    // 1.Validate the request

    const{fromAccount,toAccount,amount,idempotencyKey}=req.body;

    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json("missing fromAccount or toAccount or amount or idempotencyKey");
    }

    const fromUserAccount=await accountModel.Account.findOne({
        _id:fromAccount 
    });
    const toUserAccount = await accountModel.Account.findOne({
        _id:toAccount
    });

    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json("Invalid From Account or To Account");
    }

    // 2.Validate IdempotencyKey

    const checkIdemotencyKey=await transactionModel.transactionModel.findOne({
        idempotencyKey:idempotencyKey,
    });

    if(checkIdemotencyKey){
        if(checkIdemotencyKey.status==="COMPLETED"){
            return res.status(200).json("Transaction is completed");
        }
        if(checkIdemotencyKey.status==="PENDING"){
            return res.status(200).json("Transaction is pending");
        }
        if(checkIdemotencyKey.status==="FAILED"){
            return res.status(500).json("The transaction failed , retry");
        }
        if(checkIdemotencyKey.status==="REVERSED"){
            return res.status(500).json("The transaction is reversed, retry");
        }
    }

    //3.Check the account status
    
    if(fromAccount.status!="ACTIVE"){
        return res.status(400).json("The From Account should be ACTIVE");
    }
    if(toAccount.status!="ACTIVE"){
        return res.status(400).json("The To Account should be ACTIVE")
    }

    // 4.Derive the senders balance from the ledger.
    const balance = await fromUserAccount.getBalance();

    if(balance<amount){
        return res.status(400).json("Insufficient balance. Current balance is ${balance}. The required amount is ${amount}");
    }

    // 5.Create Transaction(PENDING)

     const session = await mongoose.startSession();
     session.startTransaction();
     const transaction=await transactionModel.Transaction.create({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey
     },
    {
        session
    })
    
    const debitLedgerEntry=await ledgerModel.Ledger.create({
        fromAccount,
        amount,
        transacition,
        Type:"DEBIT"
    });
    
    const creditLedgerEntry=await ledgerModel.Ledger.create({
        toAccount,
        amount,
        transacition,
        Type:"CREDIT"
    });

    await session.commitTransaction();
    session.endSession();

    // 10.email notification

    await email.sendTransactionSuccessEmail(fromAccount.email,fromAccount.name,amount,toAccount.name);
   
    return res.status(201).json("The transaction is successfully completed");



}