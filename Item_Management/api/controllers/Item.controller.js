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
        const ItemID = req.params.id;
        const item = await Item.findOneAndDelete(ItemID);
        if(!item){
            return res.status(404).json({massage:"Item not found"});
        }
        res.status(200).json({massage:"Item deleted successfully"});

    }
    catch(error){
        next(error);
    }
};

//updating the items from the api
export const UpdateItems = async(req,res,next) => {
    const {ItemID} = req.params; //getting the item id from the params
    const {ItemDiscription,ItemType,ItemNoOfUints} = req.body; //getting the item data from the body
    try {
        //finding the item by id and updating the item data
        const UpdateItems = await Item.findOneAndUpdate({ItemID},
            {ItemDiscription,ItemType,ItemNoOfUints},
            {new:true});
            //if the item is not found return a 404 status
            if(!UpdateItems){
                return res.status(404).json({massage:"Item not found!"});
            }
            //if the item is found return the updated item data to the frontend
            res.status(200).json(UpdateItems);
            
        
    } catch (error) {
        res.status(500).json(error);
        
    }
};

export const GetItemreport = async(req,res,next) => {
    try{
        const doc = new JSpdf();
        res.setHeader('Content-Type','application/pdf');
        res.setHeader('Content-Disposition','attachment; filename=Itemreport.pdf');
        doc.fontSize(25).text('Item Report',100,100);
        const allItems = await Item.find({});
        res.status(200).json(allItems);   
        doc.pipe(res);
        

        allItems.forEach((item,index) => {
            doc.fontSize(14).text(`${item.ItemID}:${item.ItemDiscription}`,100,150 + (index*25));
        });
        doc.end();

    }
    catch(error){
        next(error);
    };
};
