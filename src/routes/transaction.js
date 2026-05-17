const express=require("express");
const authMiddleware=require("../middleware/auth");
const createTransaction=require("../controllers/transaction")
const authSystemMiddleware=require("../middleware/authSystemMiddleware");
const router=express.Router();

router.post("/",authMiddleware,createTransaction.createTransaction);


/*
Route for the dummy account and dummy transaction amount.
*/

router.post("/system/initial-funds",authSystemMiddleware,createTransaction.initialFunds);
module.exports=router;