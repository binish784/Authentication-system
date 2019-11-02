const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const joi=require("@hapi/joi");

require("dotenv/config");

const User = require("../models/user");

const secret=process.env.SECRET;

const registerSchema=joi.object({
    username:joi.string().required().min(5),
    password:joi.string().required().min(6),
    email:joi.string().required().email()
})


const router= express.Router();

router.post("/",async function(req,res){
    const {username,password,email}=req.body;
    const new_user={
        username,
        password,
        email
    }
    const validation=registerSchema.validate(new_user);
    if(validation.error){
        return res.status(400).send({msg:validation.error.details[0].message});
    }
    try{
        const salt=await bcrypt.genSalt(10);
        const hashed_password=await bcrypt.hash(password,salt);
        const user= new User({
            "username":username,
            "password":hashed_password,
            "email":email
        })
        await user.save();
        const payload={
            username,
            email
        }
        jwt.sign(payload,secret,{expiresIn:"30s"},function(err,token){
            if(err){
                throw err;
            }
            return res.send({
                // "user":new_user,
                "token":"Bearer "+token
            });
        })
    }catch(err){
        console.log(err);
        res.send("SERVER ERROR");
    }
    
})

router.get("/",async function(req,res){
    all_users=[]
    await User.find().exec(function(err,users){
        users.forEach(function(user,index){
            all_users.push(user);
            all_users[index].password=null;
        })
        res.send(all_users);
    }); 
})

module.exports=router;