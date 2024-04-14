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

export const DeleteItems = async(req,res,next) => {
    try{
        const id=req.params.ItemID;
        console.log(id);
        const item = await Item.findOneAndDelete(req.params.ItemID);
        if(!item){
            return res.status(404).json({massage:"Item not found"});
        }

    }
    catch(error){
        next(error);
    }
}

export const UpdateItems = async(req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}

export const SearchItems = async(req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}