const Account = require("../models/accountModel");

async function createAccount(req, res) {
    try {
        const user = req.user._id;
        const account = await Account.create({ user });
        return res.status(201).json({
            account
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getAccounts(req,res){
    try{
        const user=req.user._id;
        const accounts=await Account.find({user:user});
        return res.status(201).json({
            accounts
        });
    }
    catch(error){
       return res.status(500).json({error:error.message});
    }
}
async function getAccountBalance(req, res) {
    const { accountId } = req.params;

    const account = await Account.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    return res.status(200).json({
        balance: await account.getBalance(),
        account
    })
}
module.exports = { createAccount, getAccounts,getAccountBalance };
