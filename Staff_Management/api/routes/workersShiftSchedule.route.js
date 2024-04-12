import express from 'express';
import * as workersShiftScheduleController from '../controllers/workersShiftSchedule.controller.js';
import * as shiftController from '../controllers/shift.controller.js';
import { getStaffById , getStaff} from '../controllers/staff.controller.js';

const router = express.Router();

// Create a worker's shift schedule
router.post('/create', workersShiftScheduleController.createWorkersShiftSchedule);

// Update a worker's shift schedule
router.put('/:id', workersShiftScheduleController.updateWorkersShiftSchedule);

// Delete a worker's shift schedule
router.delete('/:id', workersShiftScheduleController.deleteWorkersShiftSchedule);

// Get all worker's shift schedules
router.get('/', workersShiftScheduleController.getAllWorkersShiftSchedules);

// Get a specific shift by ID
router.get('/:id/shift', shiftController.getShiftById);

router.get('/shift', shiftController.getAllShifts);

router.get('/all/staff', getStaff);

export default router;