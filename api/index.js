import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import supplierRouter from './routes/supplier.route.js';
import authRouter from './routes/auth.router.js';
import sitemsRouter from './routes/sitems.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {

    console.log('Connected to DB !!');

}).catch ((err) => {

    console.log(err);

});

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen (3000, () => {

    console.log('Sever is running on port 3000 !');
}); 

app.use ("/api/supplier", supplierRouter);
app.use ("/api/auth", authRouter);
app.use ("/api/sitems", sitemsRouter); 

app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Sever Error ';
    return res.status(statusCode).json({

        success: false,
        statusCode,
        message,
    });
});
