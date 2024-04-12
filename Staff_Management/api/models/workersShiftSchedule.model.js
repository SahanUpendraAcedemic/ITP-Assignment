import mongoose from "mongoose";

const workersShiftScheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    shiftname: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const WorkersShiftSchedule = mongoose.model('WorkersShiftSchedule', workersShiftScheduleSchema);

export default WorkersShiftSchedule;
