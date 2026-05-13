const transactionModel=require("../models/transactionModel");
const ledgerModel=require("../models/ledgerModel");
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


}