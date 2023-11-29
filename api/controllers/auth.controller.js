import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";


export const signUp =  async (req,res)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    // using await since with differnet internet speed the 
    // time taken to save the contents will be diffenderent 
    try{
        await newUser.save();
        res.status(201).json("User created successfully");
    }catch(err){
        console.log(err.message);
        res.status(500).json(err.message);
    }

}