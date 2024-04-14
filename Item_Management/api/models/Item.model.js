import mongoose from 'mongoose';

//creating the DB schema for the Item management
const itemSchema = new mongoose.Schema(
    {
        ItemID: {
        type: String,
        required: true,
        unique: true,
    },
        ItemDiscription:{
        type: String,
        required: true,
    },
        ItemType:{
        type: String,
        required: true,
    },
        ItemNoOfUints:{
        type: Number,
        required: true,
    },
},{timestamps:true});

//creating a DB model from the schema
const Item =mongoose.model('Item',itemSchema);

//Exporting the data from the DB to App
export default Item;