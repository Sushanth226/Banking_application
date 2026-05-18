const transactionModel=require("../models/transactionModel");
const ledgerModel=require("../models/ledgerModel");
const accountModel=require("../models/accountModel");
const mongoose=require("mongoose");
const email=require("../services/gmail");
const mlFraudService=require("../services/mlFraudService");
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

    const fromUserAccount=await accountModel.findOne({
        _id:fromAccount 
    }).populate("user");
    const toUserAccount = await accountModel.findOne({
        _id:toAccount
    }).populate("user");

    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json("Invalid From Account or To Account");
    }

    // 2.Validate IdempotencyKey

    const checkIdemotencyKey=await transactionModel.transactionModel.findOne({
        idempotencyKey:idempotencyKey,
    });

    if(checkIdemotencyKey){
        if(checkIdemotencyKey.status==="COMPLETE"){
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
    
    if(fromUserAccount.status!="ACTIVE"){
        return res.status(400).json("The From Account should be ACTIVE");
    }
    if(toUserAccount.status!="ACTIVE"){
        return res.status(400).json("The To Account should be ACTIVE")
    }

    // 4.Derive the senders balance from the ledger.
    const balance = await fromUserAccount.getBalance();

    if(balance<amount){
        return res.status(400).json(`Insufficient balance. Current balance is ${balance}. The required amount is ${amount}`);
    }

    // 4.5 Run Machine Learning Fraud Detection
    const fraudScore = mlFraudService.predictFraud(amount);
    
    if (fraudScore > 0.85) {
        console.log(`[ML FRAUD DETECTED] Score: ${fraudScore}, Amount: ${amount}`);
        return res.status(403).json({
            message: "Transaction blocked due to suspicious activity detected by our ML model.",
            riskScore: (fraudScore * 100).toFixed(2) + "%",
            status: "FAILED"
        });
    }

    // 5.Create Transaction(PENDING)

     const session = await mongoose.startSession();
     session.startTransaction();
     try {
         const transactionResult=await transactionModel.transactionModel.create([{
            fromAccount,
            toAccount,
            amount,
            idempotencyKey
         }],
        {
            session
        })
        const transaction = transactionResult[0];
        
        const debitLedgerEntry=await ledgerModel.Ledger.create([{
            account: fromAccount,
            amount,
            transaction: transaction._id,
            Type:"DEBIT"
        }], { session });
        
        const creditLedgerEntry=await ledgerModel.Ledger.create([{
            account: toAccount,
            amount,
            transaction: transaction._id,
            Type:"CREDIT"
        }], { session });

        // 8.Mark transaction Completed.
        transaction.status = "COMPLETE";
        await transaction.save({ session });

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }

    // 10.email notification

    await email.sendTransactionSuccessEmail(fromUserAccount.user.email,fromUserAccount.user.name,amount,toUserAccount.user.name);
   
    return res.status(201).json("The transaction is successfully completed");

}

async function initialFunds(req,res){
    const{toAccount,amount,idempotencyKey}=req.body;
    
    const toAccountUser=await accountModel.findOne({
        _id:toAccount
    })

    if(!toAccountUser){
        return res.status(400).json("The To user account is not present");
    }

    const systemUser=await accountModel.findOne({
        user:req.user._id
    });
    
    if(!systemUser){
        return res.status(400).json("The system user account is not present");
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const transactionResult=await transactionModel.transactionModel.create([{
            fromAccount: systemUser._id,
            toAccount,
            amount,
            idempotencyKey
        }],
        {
            session
        })
        const transaction = transactionResult[0];
        
        const debitLedgerEntry=await ledgerModel.Ledger.create([{
            account: systemUser._id,
            amount,
            transaction: transaction._id,
            Type:"DEBIT"
        }], { session });
        
        const creditLedgerEntry=await ledgerModel.Ledger.create([{
            account: toAccount,
            amount,
            transaction: transaction._id,
            Type:"CREDIT"
        }], { session });
    
        transaction.status = "COMPLETE";
        await transaction.save({ session });

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
    
    

return res.status(201).json("Initial funding is completed")

}

module.exports = { createTransaction, initialFunds };