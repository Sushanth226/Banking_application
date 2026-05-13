const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"],
        lowercase:true,
        trim:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please fill a valid email address"]
    },
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password must be at least 6 characters long"],
        select:false
    }
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

const User=mongoose.model('User',userSchema);
module.exports=User;

