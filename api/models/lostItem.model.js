import mongoose from 'mongoose';

const lostItemSchema = new mongoose.Schema({
    itemId: {
        type: String,
        unique: true,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    physicalQuantity: {
        type: Number,
        validate: {
            validator: function (value) {
                // Custom validation function to check if the value is a positive round number
                return Number.isInteger(value) && value > 0;
            },
            message: 'Physical quantity must be a positive round number'
        },
        required: true
    },
    systemQuantity: {
        type: Number,
        required: true
    },
    variance: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now  // Set the default value to the current date
    }
 




}, { timestamps: true });



const LostItem = mongoose.model('LostItem', lostItemSchema);

export default LostItem;
