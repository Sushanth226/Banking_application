const mongoose = require("mongoose");
const ledgerModel=require("ledgerModel");
const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",  
        index: true
    },

    status: {
        type: String,   
        enum: {
            values: ["ACTIVE", "DEACTIVE", "FROZEN"],
            message: "Status can be ACTIVE , DEACTIVE or FROZEN"
        },
        default: "ACTIVE"
    },

    currency: {
        type: String,
        required: [true, "Currency is required"],
        default: "INR"
    }
},
{
    timestamps:true
});

// Compound Index
accountSchema.index({ user: 1, status: 1 });
accountSchema.methods.getBalance = async function () {

    const balance = await ledgerModel.Ledger.aggregate([
        
        {
            $match: {
                account: this._id
            }
        },

        {
            $group: {
                _id: null,

                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "DEBIT"] },
                            "$amount",
                            0
                        ]
                    }
                },

                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "CREDIT"] },
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },

        {
            $project: {
                _id: 0,

                balance: {
                    $subtract: ["$totalCredit", "$totalDebit"]
                }
            }
        }

    ]);

    if (balance.length === 0) {
        return 0;
    }

    return balance[0].balance;
};
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;