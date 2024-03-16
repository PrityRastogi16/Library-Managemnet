const express=require('express');
const {UserModel}=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')


const userRouter=express.Router();

userRouter.post('/register',(req,res)=>{
    const {name,email,password,role}=req.body
    try{
        bcrypt.hash(password,3,async(err,hash)=>{
            if(err){
                res.status(200).json({err});
            }else{
               const user=new UserModel({name,email,password:hash, role})
               await user.save();
               res.status(200).json({msg:"new user has been register",user})
            }
        })
    }
    catch(err){
       res.status(400).json({err});
    }
})


userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
          const user=await UserModel.findOne({email});
           if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                const access_token=jwt.sign({userID:user._id,name:user.name},"prits");
                if(result){
                    res.status(200).json({msg:"Login successfull",access_token})
                }else{
                    res.status(200).json({msg:"Please Register,Wrong Credentials"})
                }
            })
           }else{
            res.status(200).json({msg:"Please Register,Wrong Credentials"})
            // res.status(200).json({error:err});
           }
    }
    catch(err){
        res.status(400).send(err);
    }
})




module.exports={
    userRouter,
}