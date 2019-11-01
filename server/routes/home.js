const express=require("express");

const router=express.Router();

const auth=require("../middleware/auth");

router.get("/",auth,function(req,res){
    res.send({msg:"Hello, You made it through the authentication. Congrats",expires:"30s"});
})

module.exports=router;