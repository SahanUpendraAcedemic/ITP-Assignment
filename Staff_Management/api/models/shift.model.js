import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
    shiftname: {
        type: String,
        required: true,
    },
    starttime: {
        type: String, // You might want to use Date type if you're storing time in a specific format
        required: true,
    },
    endtime: {
        type: String, // Again, consider Date type if you're storing time
        required: true,
    },
    days: {
        type: [String], // Assuming an array of strings for days, e.g., ["Monday", "Wednesday"]
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;
