import Shift from '../models/shift.model.js';

export const test = (req, res) => {
    res.json({
        message: "API is working",
    });
};

export const createShift = async (req, res) => {
    const { shiftname, starttime, endtime, days, description } = req.body;

    try {
        const newShift = new Shift({ shiftname, starttime, endtime, days, description });
        await newShift.save();
        res.status(201).json({ success: true, message: "Shift created successfully", shift: newShift });
    } catch (error) {
        console.error("Error creating shift:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getAllShifts = async (req, res) => {
    try {
        const allShifts = await Shift.find({});
        res.json(allShifts);
    } catch (error) {
        console.error("Error retrieving shifts:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getShiftById = async (req, res) => {
    const { id } = req.params;

    try {
        const shift = await Shift.findById(id);
        if (!shift) {
            return res.status(404).json({ success: false, message: "Shift not found" });
        }
        res.json({ success: true, shift });
    } catch (error) {
        console.error("Error retrieving shift by ID:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateShift = async (req, res) => {
    const { id } = req.params;
    const { shiftname, starttime, endtime, days, description } = req.body;

    try {
        const updatedFields = { shiftname, starttime, endtime, days, description };
        const updatedShift = await Shift.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedShift) {
            return res.status(404).json({ success: false, message: "Shift not found" });
        }
        res.json({ success: true, message: "Shift updated successfully", shift: updatedShift });
    } catch (error) {
        console.error("Error updating shift:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteShift = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShift = await Shift.findByIdAndDelete(id);
        if (!deletedShift) {
            return res.status(404).json({ success: false, message: "Shift not found" });
        }
        res.json({ success: true, message: "Shift deleted successfully" });
    } catch (error) {
        console.error("Error deleting shift:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
