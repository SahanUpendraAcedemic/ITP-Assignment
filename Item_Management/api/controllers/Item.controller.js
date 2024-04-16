import Item from '../models/Item.model.js';

//adding items through the api
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

//rendering all the items from the api
export const GetItems = async (req,res,next) => {
    try{
        const allItems = await Item.find({});
        res.status(200).json(allItems);     
    }
    catch(error){
        next(error);
    };
    
};

export const GetsingItems = async (req,res,next) => {
    try{
        const ItemID = req.params.ItemID;
        const oneItem = await Item.findOne({ItemID});
        res.status(200).json(oneItem);     
    }
    catch(error){
        next(error);
    };
    
};

//deleting an item from the api
export const DeleteItems = async(req,res,next) => {
    try{
        const id=req.params.ItemID;
        const item = await Item.findOneAndDelete(req.params.ItemID);
        if(!item){
            return res.status(404).json({massage:"Item not found"});
        }

    }
    catch(error){
        next(error);
    }
};

//updating the items from the api
export const UpdateItems = async(req,res,next) => {
    const {id} = req.params; //getting the item id from the params
    const {ItemDiscription,ItemType,ItemNoOfUints} = req.body; //getting the item data from the body
    try {
        //finding the item by id and updating the item data
        const UpdateItems = await Item.findByIdAndUpdate(id,
            {ItemDiscription,ItemType,ItemNoOfUints},
            {new:true});

            //if the item is not found return a 404 status
            if(!UpdateItems){
                return res.status(404).json({massage:"Item not found!"});
            }
            //if the item is found return the updated item data to the frontend
            res.status(200).json(UpdateItems);
        
    } catch (error) {
        res.status(500).json({massage:"Item update failed!"});
        next(error);
        
    }
};