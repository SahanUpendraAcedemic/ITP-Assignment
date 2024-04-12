import mongoose from 'mongoose';
import WorkersShiftSchedule from '../models/workersShiftSchedule.model.js';
import Shift from '../models/shift.model.js';
import Staff from '../models/staff.model.js';

export const createWorkersShiftSchedule = async (req, res) => {
    const { shiftId, staffIds } = req.body;

    try {
        // Fetch shift details by ID
        const shift = await Shift.findById(shiftId);
        if (!shift) {
            return res.status(404).json({ success: false, message: "Shift not found" });
        }

        // Fetch staff details by _id
        const staff = await Staff.find({ _id: { $in: staffIds } });
        if (!staff || staff.length !== staffIds.length) {
            return res.status(404).json({ success: false, message: "One or more staff members not found" });
        }

        // Extract ids and names from staff
        const staffIdsArray = staff.map(member => member.id.toString());
        const staffNamesArray = staff.map(member => member.name);
        const staffTypeArray = staff.map(member => member.type);

        // Create new workers shift schedule
        const newWorkersShiftSchedule = new WorkersShiftSchedule({ 
            shiftname: shift.shiftname,
            staff: staff.map(member => ({ name: member.name,type: member.type, id: member.id.toString() })) // Ensure staff.name and staff._id are valid strings
        });

        // Set id and name fields for validation
        newWorkersShiftSchedule.id = staffIdsArray.join(", "); // Joining the array elements into a single string
        newWorkersShiftSchedule.name = staffNamesArray.join(", ");
        newWorkersShiftSchedule.type = staffTypeArray.join(", ");  // Joining the array elements into a single string

        await newWorkersShiftSchedule.save();

        res.status(201).json({ 
            success: true, 
            message: "Worker's shift schedule created successfully", 
            workersShiftSchedule: newWorkersShiftSchedule 
        });
    } catch (error) {
        console.error("Error creating worker's shift schedule:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};









// Update Workers Shift Schedule
export const updateWorkersShiftSchedule = async (req, res) => {
    const { id } = req.params;
    const { shiftId, staffIds } = req.body;

    try {
        // Fetch shift details by ID
        const shift = await Shift.findById(shiftId);
        if (!shift) {
            return res.status(404).json({ success: false, message: "Shift not found" });
        }

        // Fetch staff details by IDs
        const staff = await Staff.find({ _id: { $in: staffIds } });
        if (staff.length !== staffIds.length) {
            return res.status(404).json({ success: false, message: "One or more staff members not found" });
        }

        // Extract ids and names from staff
        const staffIdsArray = staff.map(member => member._id.toString());
        const staffNamesArray = staff.map(member => member.name);

        // Update workers shift schedule
        const updatedWorkersShiftSchedule = await WorkersShiftSchedule.findByIdAndUpdate(id, { 
            shiftname: shift.shiftname,
            staff: staff.map(member => ({ name: member.name, id: member._id.toString() })) // Ensure staff.name and staff._id are valid strings
        }, { new: true });

        // Set id and name fields for validation
        updatedWorkersShiftSchedule.id = staffIdsArray.join(", "); // Joining the array elements into a single string
        updatedWorkersShiftSchedule.name = staffNamesArray.join(", "); // Joining the array elements into a single string

        if (!updatedWorkersShiftSchedule) {
            return res.status(404).json({ success: false, message: "Worker's shift schedule not found" });
        }

        res.json({ success: true, message: "Worker's shift schedule updated successfully", workersShiftSchedule: updatedWorkersShiftSchedule });
    } catch (error) {
        console.error("Error updating worker's shift schedule:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// Delete Workers Shift Schedule
export const deleteWorkersShiftSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWorkersShiftSchedule = await WorkersShiftSchedule.findByIdAndDelete(id);
        if (!deletedWorkersShiftSchedule) {
            return res.status(404).json({ success: false, message: "Worker's shift schedule not found" });
        }
        res.json({ success: true, message: "Worker's shift schedule deleted successfully" });
    } catch (error) {
        console.error("Error deleting worker's shift schedule:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get All Workers Shift Schedules
export const getAllWorkersShiftSchedules = async (req, res) => {
    try {
        const allWorkersShiftSchedules = await WorkersShiftSchedule.find({});
        res.json(allWorkersShiftSchedules);
    } catch (error) {
        console.error("Error retrieving worker's shift schedules:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};