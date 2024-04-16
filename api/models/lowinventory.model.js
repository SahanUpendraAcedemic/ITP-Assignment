import mongoose from 'mongoose';

const lowinventorySchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },
    // address: {
    //   type: String,
    //   required: true,
    // },
    // sellerName: {
    //   type: String,
    //   required: true,
    // },
   
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
   
    // regularPrice: {
    //   type: Number,
    //   required: true,
    // },
    // discountPrice: {
    //   type: Number,
    //   required: true,
    // },
    // bathrooms: {
    //   type: Number,
    //   required: true,
    // },
    // bedrooms: {
    //   type: Number,
    //   required: true,
    // },
    // furnished: {
    //   type: Boolean,
    //   required: true,
    // },
    // parking: {
    //   type: Boolean,
    //   required: true,
    // },
    // type: {
    //   type: String,
    //   required: true,
    // },
    // offer: {
    //   type: Boolean,
    //   required: true,
    // },
    // imageUrls: {
    //   type: Array,
    //   required: true,
    // },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LowInventory = mongoose.model('LowInventory', lowinventorySchema);

export default LowInventory;
