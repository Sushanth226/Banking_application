const express=require("express");
const authMiddleware=require("../middleware/auth");
const router=express.Router;

router.post("/",authMiddleware.authMiddleware,);

module.export=router;