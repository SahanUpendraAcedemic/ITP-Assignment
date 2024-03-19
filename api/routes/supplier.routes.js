import experess from 'express';
import { test } from '../controllers/supplier.controllers.js';

const router = experess.Router();

router.get('/', test); 


export default router;