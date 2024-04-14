// systemItem.controller.js

import SystemItem from '../models/item.model.js';

// Controller function to get all system items
export const getAllSystemItems = async (req, res) => {
    try {
        const systemItems = await SystemItem.find();
        res.status(200).json(systemItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to add a new system item
export const addSystemItem = async (req, res) => {
    const { itemId, itemName, itemType, Quantity } = req.body;

    try {
        const newItem = new SystemItem({
            itemId,
            itemName,
            itemType,
            Quantity
        });

        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
