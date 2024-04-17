// lostItem.route.js
import express from 'express';
import { addLostItem,getAllItems,deleteLostItem,updateLostItem,getLostItemById,generateReport} from '../Controllers/lostItem.controller.js';
import {getVariance} from '../Controllers/variance.controller.js'
const router = express.Router();

router.post("/add_lost_item", addLostItem);
router.get("/lost_item_list", getAllItems);
router.get("/lost_item_list/:id", getLostItemById);
router.delete("/delete_lost_item/:id", deleteLostItem); 
router.put('/update_lost_item/:id', updateLostItem);
router.get("/generate_report", generateReport);
router.get('/get_variance', getVariance);

export default router;
