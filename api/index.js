import experess from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const app = experess();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('connect to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log("Sever listening on port 3000 ")
});