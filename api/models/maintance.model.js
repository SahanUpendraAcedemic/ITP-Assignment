import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const maintenanceSchema = new mongoose.Schema({
    maintenanceId: {
        type: String,
        default: uuidv4, // Generate a UUID for maintenanceId
        unique: true
      },
  taskTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  equipmentFacility: {
    type: String,
    required: true
  },
  maintenanceType: {
    type: String,
    enum: ['Routine Inspection', 'Preventive Maintenance', 'Corrective Maintenance', 'Emergency Repair'],
    required: true
  },
  scheduledDateTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true
  },
  assignedTechnician: {
    type: String, // Only technician name
    required: true
  },
  assignedTechnicianContact: {
    type: String, // Technician contact
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  costEstimation: {
    type: Number, // Estimated cost in currency
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Canceled'],
    default: 'Pending'
  }
}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

export default Maintenance;
