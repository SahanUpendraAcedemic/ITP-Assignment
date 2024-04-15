import express from 'express';
import { createSitems, deleteSitems, getSitems, updateSitems } from '../controllers/sitems.controller.js';
import { verifyToken } from '../utils/verifySupplier.js';

const router = express.Router();

router.post('/create', verifyToken, createSitems);
router.delete('/delete/:id', verifyToken, deleteSitems);
router.post('/update/:id', verifyToken, updateSitems);
router.get('/get/:id', getSitems);

export default router;