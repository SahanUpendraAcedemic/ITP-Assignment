// lostItem.controller.js
import LostItem from '../models/lostItem.model.js';
import { generateExcelFile } from '../utils/excel.js';
import SystemItem from '../models/item.model.js';
import LostItemReports from '../models/lostitemreport.model.js'





export const addLostItem = async (req, res) => {
    const { itemId, itemName, itemType, physicalQuantity, description } = req.body;

    try {
        // Check if an item with the same itemId already exists
        const existingItem = await LostItem.findOne({ itemId });

      if (existingItem) {
            return res.status(400).json({ message: 'Item with the same itemId already exists' });
        }

        // Calculate the variance
        const systemItem = await SystemItem.findOne({ itemId });
        const systemQuantity = systemItem ? systemItem.Quantity : 0;
        const variance =  physicalQuantity-systemQuantity;

        // Create a new lost item with variance and system quantity
        const newLostItem = new LostItem({
            itemId,
            itemName,
            itemType,
            physicalQuantity,
            description,
            systemQuantity,
            variance
        });

        // Save the new lost item
        await newLostItem.save();

        res.status(201).json({ message: "Lost item added successfully", systemQuantity, variance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllItems = async (req, res) => {
    try {
        const items = await LostItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteLostItem = async (req, res) => {
    const { id } = req.params;

    try {
        await LostItem.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*export const updateLostItem = async (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;

    try {
        const item = await LostItem.findByIdAndUpdate(id, updatedItem, { new: true });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};*/
export const updateLostItem = async (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;

    try {
        const oldItem = await LostItem.findById(id);
        if (!oldItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const systemQuantity = oldItem.systemQuantity;
        const physicalQuantity = updatedItem.physicalQuantity;
        const variance = physicalQuantity - systemQuantity;
        updatedItem.variance = variance;

        const item = await LostItem.findByIdAndUpdate(id, updatedItem, { new: true });

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






//test
export const getLostItemById = async (req, res) => {
    const { id } = req.params; // Get the item ID from the request parameters
  
    try {
      // Find the lost item by its ID in the database
      const item = await LostItem.findById(id);
  
      // Check if the item exists
      if (!item) {
        // If the item is not found, return a 404 Not Found error
        return res.status(404).json({ message: 'Lost item not found' });
      }
  
      // If the item is found, return it in the response
      res.status(200).json(item);
    } catch (error) {
      // If there's any error, return a 500 Internal Server Error with the error message
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  export const generateReport = async (req, res) => {
    try {
        const items = await LostItem.find();
        const excelBuffer = await generateExcelFile(items);
        res.setHeader('Content-Disposition', 'attachment; filename=lost_items_report.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/*export const generateReport = async (req, res) => {
    try {
      const items = await LostItem.find();
      const excelBuffer = await generateExcelFile(items);
  
      const filename = `lost_items_report_${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${currentDate.getDate()}.xlsx`;
  
      // Upload to Firebase Storage
      try {
        await storage.bucket.file(filename).save(excelBuffer);
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(filename)}?alt=media`;
  
        // Create a LostItemReport (modify schema if needed)
        const newReport = new LostItemReports({
          createdBy: req.user.id || 'anonymous', // Assuming you have user authentication
          createdDate: new Date(),
          month: currentDate.getMonth() + 1, // Months are 0-indexed
          year: currentDate.getFullYear(),
          overallVariance: calculateOverallVariance(items), // Implement logic to calculate overall variance
          downloadLink: downloadUrl
        });
  
        await newReport.save();
  
        res.status(200).json({ message: 'Report generated successfully', downloadUrl });
      } catch (error) {
        console.error('Error uploading report to Firebase Storage:', error);
        res.status(500).json({ message: 'Error generating report' });
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Error generating report' });
    }
  };*/

