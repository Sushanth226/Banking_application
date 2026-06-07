// const accountModel=require('../models/accountModel');
const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/auth");
const accountController=require("../controllers/account");


router.post('/create',authMiddleware,accountController.createAccount);
// getaccounts
router.get('/',authMiddleware,accountController.getAccounts);
// get Balance
router.get('/balance/:accountId',authMiddleware,accountController.getAccountBalance);
module.exports=router;
