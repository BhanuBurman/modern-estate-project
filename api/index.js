import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';

import dotenv from 'dotenv';


dotenv.config(); // This resolves the error

// We will get an error since we cannot use environment variables directly in the backend
// so we need to install dotenv using 'npm i dotenv' and import it manually
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(()=>{
    console.log("Connected to MongDB");
}).catch((error)=>{
    console.log(error);
});

const app = express();
app.listen(3000,()=>{
    console.log('Server listening on port: 3000');
})

app.use("/api/user",userRouter);