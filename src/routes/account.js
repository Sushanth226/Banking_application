const accountModel=require('../models/accountModel');
const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth");
const createAccount=require("../controllers/account");

router.post('/create',authMiddleware,createAccount);

module.exports=router;
