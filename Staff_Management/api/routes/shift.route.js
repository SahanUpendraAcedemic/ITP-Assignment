import express from 'express';
import * as shiftController from '../controllers/shift.controller.js';

const router = express.Router();

// Test route
router.get('/test', shiftController.test);

// CRUD routes for shifts
router.get('/', shiftController.getAllShifts);
router.get('/:id', shiftController.getShiftById);
router.post('/create', shiftController.createShift);
router.put('/:id', shiftController.updateShift);
router.delete('/:id', shiftController.deleteShift);

export default router;
