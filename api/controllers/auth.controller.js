import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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


export const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    console.log(email, password);
    try{
        const validUser = await User.findOne({email: email});
        if(!validUser){
            return next(errorHandler(404,"User not found!"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(401,"Wrong credentials!"));
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_TOKEN_PASSWORD);
        const {password:pass,...rest} = validUser._doc;


        res.cookie('access_token',token,{httpOnly:true})
        .status(200).json(rest)

    } catch(err){
        next(err);
    }
}