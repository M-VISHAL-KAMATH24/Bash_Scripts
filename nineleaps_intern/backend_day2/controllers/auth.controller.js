import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export const signUp=async(req,res,next)=>{
const session=await mongoose.startSession();
session.startTransaction();

try{
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});

    if(existingUser){
        const error=new Error('user already exixts');
        error.statusCode=409;
        throw error;
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUsers=await User.create([{name,email,password:hashedPassword}],{session})

    const token = jwt.sign(
  { userId: newUsers[0]._id },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN }
);


    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
        sucess:true,
        message:'user created successfully',
        data:{
            token,
            user:newUsers[0]
        }
    })
}catch(error){
    await session.abortTransaction();
    session.endSession();
    next(error);
}
}

export const signIn=async(req,res,next)=>{

}


export const signOut=async(req,res,next)=>{

}