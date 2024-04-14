import express from 'express';
import { createLowInventory, deleteLowInventory, updateLowInventory,getLowInventory,getLowInventorys } from '../controllers/lowinventory.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createLowInventory);
router.delete('/delete/:id', verifyToken, deleteLowInventory);
router.post('/update/:id', verifyToken, updateLowInventory);
router.get('/get/:id', getLowInventory);
router.get('/get', getLowInventorys);

export default router;
