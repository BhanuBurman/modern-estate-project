import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true,
        unique: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
},{timestamps: true});

const User = new mongoose.Model('User',userSchema);

export default User;

