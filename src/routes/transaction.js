const express=require("express");
const authMiddleware=require("../middleware/auth");
const createTransaction=require("../controllers/transaction")
const router=express.Router;

router.post("/",authMiddleware.authMiddleware,createTransaction.createTransaction);

module.export=router;