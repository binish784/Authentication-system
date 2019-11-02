const express=require("express");
const joi =require("@hapi/joi");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const router =express.Router();

require("dotenv/config");

const secret=process.env.SECRET;
const data=require("../user_Data/data").users;

const User = require("../models/user");

const loginSchema=joi.object({
    email:joi.string().required().email(),
    password:joi.string().required()
})

router.post("/",async function(req,res){
    const validation=loginSchema.validate(req.body);
    const {email,password}=req.body;
    if(validation.error){
        return res.status(400).send({msg:validation.error.details[0].message});
    }
    const auth_user=await User.findOne({email})
    if(auth_user){
        try{
            const pass_match=await bcrypt.compare(password,auth_user.password);
            if(pass_match){
                const payload={
                    "username":auth_user.username,
                    "email":email
                }
                jwt.sign(payload,secret,{expiresIn:"30s"},function(err,token){
                    if(err){
                        throw err;
                    }
                    res.send({
                        // user:auth_user,
                        "token":"Bearer "+token
                    });
                })
            }else{
                res.status(404).send({msg:"Incorrect password"});
            }
        }catch(err){
            console.log(err);
            res.send("SERVER ERROR");
        }
    }else{
        return res.status(400).send({msg:"User not registered"});
    }
})

module.exports=router;