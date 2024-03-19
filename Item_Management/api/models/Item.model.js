import mongoose from "mongoose";

//creating the DB schema for the Item management
const itemSchema = new mongoose.Schema({

    ItemID:{
        Type:String,
        required:true,
        unique:true,
    },
    ItemDiscription:{
        Type:String,
        required:true,
        unique:true,
    },
    ItemType:{
        Type:String,
        required:true,
    },
    ItemNoOfUints:{
        Type:Int,
        required:true,
    },
},{timestamps:true});

//creating a DB model from the schema
const Item =mongoose.model('Item',itemSchema);

//Exporting the data from the DB to App
export default Item;