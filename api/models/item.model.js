// systemItem.model.js
import mongoose from 'mongoose';

const systemItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
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
  Quantity: {
    type: Number,
    validate: {
        validator: function (value) {
            // Custom validation function to check if the value is a positive round number
            return Number.isInteger(value) && value > 0;
        },
        message: 'Physical quantity must be a positive round number'
    },
    required: true
  }
}, ); // Corrected collection name

const SystemItem = mongoose.model('SystemItem', systemItemSchema);

export default SystemItem;
