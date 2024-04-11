import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    joindate: {
        type: String,
        required: true,
    },
    license: {
        type: Number,
    },
    password: {
        type: String,
    },
}, { timestamps: true });

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
