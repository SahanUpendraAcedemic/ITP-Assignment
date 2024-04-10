import express from "express";
import  mongoose  from "mongoose";
import dotenv from 'dotenv';
import adminRouter from './routes/admin.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then (() => {
    console.log ('connected to MongoDB!!');
}).catch((err) => {
    console.log(err);
});
const app = express();

app.listen(3000, () => {
    console.log('Sever is running on pote 3000 !!');
});

app.use('/api/admin', adminRouter);
