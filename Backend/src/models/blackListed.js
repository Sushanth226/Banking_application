const mongoose=require("mongoose");

const blackListedSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"The token is required to make it blacklisted"],
        unique:[true,"The token should be unique"]
    }
},{
    timestamps:true
})

blackListedSchema.index({createdAt:1}),{
     expireAfterSeconds: 60 * 60 * 24 * 3 // 3 days
};

const BlackListed=mongoose.model("BlackListed",blackListedSchema);

module.exports={BlackListed};