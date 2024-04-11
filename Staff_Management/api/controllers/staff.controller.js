import Staff from '../models/staff.model.js';

export const test = (req, res) => {
    res.json({
        message: "API is working",
    });
};

export const getStaff = async (req, res) => {
    try {
        const allStaff = await Staff.find({});
        res.json(allStaff);
    } catch (error) {
        console.error("Error retrieving staff:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getStaffById = async (req, res) => {
    const { id } = req.params;

    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }
        res.json({ success: true, staff });
    } catch (error) {
        console.error("Error retrieving staff by ID:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateStaff = async (req, res) => {
    const { id } = req.params; // Use _id instead of id
    const { number, address } = req.body;

    try {
        const updatedFields = {};
        if (number) updatedFields.number = number;
        if (address) updatedFields.address = address;

        const updatedStaff = await Staff.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }
        res.json({ success: true, message: "Staff member updated successfully", staff: updatedStaff });
    } catch (error) {
        console.error("Error updating staff:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const deleteStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStaff = await Staff.findByIdAndDelete(id);
        if (!deletedStaff) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }
        res.json({ success: true, message: "Staff member deleted successfully" });
    } catch (error) {
        console.error("Error deleting staff:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};