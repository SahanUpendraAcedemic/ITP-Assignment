import Item from '../models/Item.model.js';

export const AddItems = async (req,res,next) => {
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

export const GetItems = async (req,res,next) => {
    try{
        const allItems = await Item.find({});
        res.status(200).json(allItems);     
    }
    catch(error){
        next(error);
    };
    
};
