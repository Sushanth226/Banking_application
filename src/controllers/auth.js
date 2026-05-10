const User=require('../models/userModel');

// Register a new user (controller function)
async function registerUser(req,res){
    const {email,username,password}=req.body;
    if(!email || !username || !password){
        return res.status(400).json({message:"email,username and password are required"});
    }
    const userExists=await User.findOne({email:email});
    if(userExists){
        return res.status(400).json(
            {message:"user already exists",
                status:"failed"
            });
    }
    await User.create({email,username,password});
    return res.status(200).json({message:"The User is Created"});
}

// Login a user
async function loginUser(req,res){
     const {email,password}=req.body;
     if(!email || !password){
        return res.status(400).json({message:"email and password are required",
            status:"failed"
        }
        );
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"invalid credentials",
            status:"failed"
        });
    }
    return res.status(200).json({message:"login successful"});
}

module.exports = { registerUser, loginUser };