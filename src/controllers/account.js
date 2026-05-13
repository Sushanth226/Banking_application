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
module.exports = createAccount;
