import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import staffRoutes from './routes/staff.route.js';
import authRoutes from './routes/auth.route.js';
import shiftRoutes from './routes/shift.route.js';
import workersShiftScheduleRoutes from './routes/workersShiftSchedule.route.js'; // Corrected import statement


dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch(() =>{
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, () => { 
    console.log('Server listning on port 3000');
});

app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/workersShiftSchedule", workersShiftScheduleRoutes);


app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});