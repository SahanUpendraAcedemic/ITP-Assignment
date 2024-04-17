// backend/controllers/varianceController.js

import WarehouseItem  from '../models/lostItem.model.js'; // Import WarehouseItem model/schema
import SystemItem  from '../models/item.model.js'; // Import SystemItem model/schema

export const getVariance = async (req, res) => {
  try {
    // Fetch items from both databases/collections
    const warehouseItems = await WarehouseItem.find();
    const systemItems = await SystemItem.find();

    // Perform variance calculation logic
    // For example, calculate the difference between the counts of corresponding items
    const varianceData = warehouseItems.map((warehouseItem) => {
      const systemItem = systemItems.find((item) => item.itemId === warehouseItem.itemId);
      const variance = systemItem ? warehouseItem.quantity - systemItem.quantity : warehouseItem.quantity;
      return {
        itemId: warehouseItem.itemId,
        warehouseQuantity: warehouseItem.quantity,
        systemQuantity: systemItem ? systemItem.quantity : 0,
        variance
      };
    });

    res.json(varianceData);
  } catch (error) {
    console.error('Error fetching variance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
