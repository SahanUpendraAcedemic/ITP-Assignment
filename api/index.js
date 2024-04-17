import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import firebase from 'firebase/compat/app'; // Import Firebase properly
import userRoutes from './routes/user.route.js';
import AuthRoute from './routes/Auth.route.js';
import lostItemRoutes from './routes/lostItem.route.js'; 
import ItemRoute from './routes/item.route.js';
import Maintanceroute from './routes/maintance.route.js';

dotenv.config(); 


  



mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/Auth", AuthRoute);
app.use("/api/lostItem", lostItemRoutes);
app.use("/api/item", ItemRoute);
app.use("/api/maintance", Maintanceroute)