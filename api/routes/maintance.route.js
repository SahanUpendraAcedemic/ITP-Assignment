import express from 'express';
import {createMaintenanceTask,getAllMaintenanceTasks} from '../Controllers/maintance.controller.js'

const router = express.Router();



router.post("/create_maintence_task",createMaintenanceTask);
router.get("/MaintenanceListPage",getAllMaintenanceTasks);









export default router;

