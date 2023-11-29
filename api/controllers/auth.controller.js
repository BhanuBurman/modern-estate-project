import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const signUp =  async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    // using await since with differnet internet speed the 
    // time taken to save the contents will be diffenderent 
    try{
        await newUser.save();
        res.status(201).json("User created successfully");
    }catch(err){
        next(err);
        // next(errorHandler(550,"Error from tne function"));
    }

}