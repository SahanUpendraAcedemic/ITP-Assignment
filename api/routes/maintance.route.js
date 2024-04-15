import express from 'express';
import {createMaintenanceTask} from '../Controllers/maintance.controller.js'

const router = express.Router();



router.post("/create_maintence_task",createMaintenanceTask);









export default router;

