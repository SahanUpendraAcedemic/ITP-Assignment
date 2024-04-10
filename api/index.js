import express from "express";
import  mongoose  from "mongoose";
import dotenv from 'dotenv';
import adminRouter from './routes/admin.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then (() => {
    console.log ('connected to MongoDB!!');
}).catch((err) => {
    console.log(err);
});
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Sever is running on pote 3000 !!');
});

app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
