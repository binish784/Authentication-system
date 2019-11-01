const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const joi=require("@hapi/joi");
const uuid=require("uuid");

const secret="SECRET_KEY123";

const registerSchema=joi.object({
    id:joi.string().required(),
    username:joi.string().required().min(5),
    password:joi.string().required().min(6),
    email:joi.string().required().email()
})

let data=require("../user_Data/data").users;

const router= express.Router();

router.post("/",async function(req,res){
    const id=uuid.v4();
    const {username,password,email}=req.body;
    let new_user={
        id,
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
        new_user.password=await bcrypt.hash(new_user.password,salt);
        data.push(new_user);
        const payload={
            id:new_user.id,
            email:new_user.email
        }
        jwt.sign(payload,secret,{expiresIn:"60m"},function(err,token){
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

router.get("/",function(req,res){
    res.send(data);
})

module.exports=router;