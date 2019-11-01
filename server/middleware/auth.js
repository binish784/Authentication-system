const jwt =require("jsonwebtoken");

require("dotenv/config");

const secret=process.env.SECRET;

const auth=async function(req,res,next){
    if(!req.headers["authorization"]){
        return res.status(400).send({msg:"Authorization token not found"});
    }
    const token=req.headers["authorization"].split(" ")[1];
    try{
        if(token){
            await jwt.verify(token,secret,function(err,authData){
                if(err){
                    return res.status(403).send({msg:"Token verification failed"});
                }
                next();
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).send("SERVER ERROR");
    }   
}

module.exports=auth;