const jwt=require("jsonwebtoken");
const userModel=require("../models/userModel");

const authSystemMiddleware= async (req,res,next)=>{
  try{
    const token=req.cookies.token;
     if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
     const user = await userModel.findById(decoded.user_Id).select('+systemUser');
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if(user.systemUser === false){
            return res.status(203).json("The User must be the system user");
        }
        req.user = user;
        
        return next();

  }catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
}

module.exports=authSystemMiddleware;