const mongoose = require("mongoose");

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

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;