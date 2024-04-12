import express from "express";
import {AddItems, GetItems} from '../controllers/Item.controller.js';

const router = express.Router();

//getting massage from API route
router.post('/',AddItems);
router.post('/getitem',GetItems);

export default router;