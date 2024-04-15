import mongoose from 'mongoose';

const lowinventorySchema = new mongoose.Schema(
  {

   
    itemCode: {
      type: String,
      required: true,
      unique: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    newlevel: {
      type: Number,
      required: true,
    },
    curruntlevel: {
      type: Number,
      required: true,

    },
  
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LowInventory = mongoose.model('LowInventory', lowinventorySchema);

export default LowInventory;
