import Maintenance from '../models/maintance.model.js';

export const createMaintenanceTask = async (req, res) => {
  try {
    const {
        
      taskTitle,
      description,
      equipmentFacility,
      maintenanceType,
      scheduledDateTime,
      duration,
      assignedTechnician,
      assignedTechnicianContact,
      priority,
      costEstimation
    } = req.body;

    const newMaintenanceTask = new Maintenance({
      taskTitle,
      description,
      equipmentFacility,
      maintenanceType,
      scheduledDateTime,
      duration,
      assignedTechnician,
      assignedTechnicianContact,
      priority,
      costEstimation
    });

    await newMaintenanceTask.save();

    res.status(201).json({
      success: true,
      message: 'Maintenance task created successfully',
      maintenanceTask: newMaintenanceTask
    });
  } catch (error) {
    console.error('Error creating maintenance task:', error);
    res.status(500).json({ success: false, message: 'Failed to create maintenance task' });
  }
};

export const getAllMaintenanceTasks = async (req, res) => {
    try {
      // Fetch all maintenance tasks from the database
      const maintenanceTasks = await Maintenance.find();
      res.status(200).json(maintenanceTasks);
    } catch (error) {
      console.error('Error fetching maintenance tasks:', error);
      res.status(500).json({ message: 'Failed to fetch maintenance tasks' });
    }
  };
