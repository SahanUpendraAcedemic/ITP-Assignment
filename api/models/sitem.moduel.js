import mongoose from 'mongoose';

const sitemsSchema = new mongoose.Schema(
    {
        supplierName : {
            type : String,
            required : true,
        },

        category : {
            type : String,
            required : true,
        },

        itemName : {
            type : String,
            required : true,
            unique : true,
        },

        unitPrice : {
            type : Number,
            required : true,
        },

        supplierRef : {
            type : String,
            required : true,
        }

    }, {timestamps : true}
)

const Sitems  = mongoose.model('Sitems', sitemsSchema);

export default Sitems;