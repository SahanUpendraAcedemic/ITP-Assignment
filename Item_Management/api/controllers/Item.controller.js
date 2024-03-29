import Item from '../models/Item.model.js';

export const test = async (req,res,next) => {
    const{ItemID,ItemDiscription,ItemType,ItemNoOfUints}=req.body; 
    const newItem = new Item({
        ItemID,
        ItemDiscription,
        ItemType,
        ItemNoOfUints
    });
    try {
        await newItem.save();
        res.status(201).json({massage:"Item added successfully"});
    } catch (error) {
        next(error);
    }
    
};
