const express= require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv = require("dotenv");

require("dotenv/config");


const app =new express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use("/login",require("./routes/login"));
app.use("/register",require("./routes/register"));
app.use("/",require("./routes/home"));
app.use("*",function(req,res){
    res.status(404).send({msg:"Not a valid api endpoint"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,function(err){
    if(err){
        console.log("SERVER ERROR : PORT",PORT);
    }else{
        console.log("SERVER LISTENING ON PORT",PORT);
    }
})

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },function(err){
    if(err){
        console.log("DATABASE CONNECTION ERROR ",err);
    }else{
        console.log("DATABASE CONNECTED");
    }
})