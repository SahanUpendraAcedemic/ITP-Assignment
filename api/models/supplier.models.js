import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({

    username:{
        type : String,
        required : true,
        unique : true,

    },
    password:{

        type : String,
        requires : true,
    }
} , {timestamps: true});

const supplier = mongoose.models('Supplier',supplierSchema);

export default supplier;