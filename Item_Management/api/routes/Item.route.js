import express from "express";
import {AddItems, GetItems,DeleteItems,UpdateItems,GetsingItems,GetItemreport} from '../controllers/Item.controller.js';


const router = express.Router();

router.post('/',AddItems);
router.post('/getitem',GetItems);
router.post('/getitem/:ItemID', GetsingItems);
router.delete('/item_delete',DeleteItems);
router.put('/item_update/:ItemID',UpdateItems);
router.get('/item_report',GetItemreport);

export default router;