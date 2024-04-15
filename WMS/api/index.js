import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// creating a connection to the database using mongoose
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

// creating routes
const router = express.Router();

// creating an instance of the express server
const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

