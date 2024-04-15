import express from 'express';
import { deleteSupplier, test, updateSupplier, getSupplierSitems } from '../controllers/supplier.controller.js';
import { verifyToken } from '../utils/verifySupplier.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id',verifyToken, updateSupplier);
router.delete('/delete/:id',verifyToken, deleteSupplier);
router.get('/sitems/:id', verifyToken, getSupplierSitems);



export default router;