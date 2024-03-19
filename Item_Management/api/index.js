import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itemRoutes from "./routes/Item.route.js"
dotenv.config();

//Database connection to mongoDB cloud with console feedback and error feedback
mongoose.connect(process.env.MONGO) //added a .env file const for better protection on DB connection
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

const app=express();

app.listen(3000,() => {
    console.log('Server listing to port 3000')
});

//API route
app.use("/api/Item", itemRoutes);
