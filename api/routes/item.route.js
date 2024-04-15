// systemItem.route.js

import express from 'express';
import { getAllSystemItems, addSystemItem } from '../Controllers/item.controller.js';
import {addLostItem} from '../Controllers/lostItem.controller.js'


const router = express.Router();

// Route to get all system items
router.get('/view_item', getAllSystemItems);

// Route to add a new system item
router.post('/add_item', addSystemItem);
router.get('/variance', addLostItem);

export default router;
