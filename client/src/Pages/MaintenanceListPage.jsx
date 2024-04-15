import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MaintenanceListPage = () => {
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);

  useEffect(() => {
    fetchMaintenanceTasks();
  }, []);

  const fetchMaintenanceTasks = async () => {
    try {
      const response = await fetch('/api/maintance/MaintenanceListPage');
      const data = await response.json();
      setMaintenanceTasks(data);
    } catch (error) {
      console.error('Error fetching maintenance tasks:', error);
    }
  };
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'UTC'
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
  };

  return (
    <div className="container mx-auto mt-20 mr-20">
    <h1 className="text-3xl font-semibold mb-4">All Maintenance Tasks</h1>
    <table className="w-full border border-blue-500">
      <thead>
        <tr className="bg-white border border-blue-500">
          <th className="px-4 py-2 border border-blue-500">Task Title</th>
          <th className="px-4 py-2 border border-blue-500">Equipment/Facility</th>
          <th className="px-4 py-2 border border-blue-500">Maintenance Type</th>
          <th className="px-4 py-2 border border-blue-500">Scheduled Date and Time</th>
          <th className="px-4 py-2 border border-blue-500">Duration (minutes)</th>
          <th className="px-4 py-2 border border-blue-500">Assigned Technician</th>
          <th className="px-4 py-2 border border-blue-500">Assigned Technician Contact</th>
          <th className="px-4 py-2 border border-blue-500">Priority</th>
          <th className="px-4 py-2 border border-blue-500">Cost Estimation</th>
          <th className="px-4 py-2 border border-blue-500">Description</th>
          <th className="px-4 py-2 border border-blue-500">Status</th>
        </tr>
      </thead>
      <tbody>
        {maintenanceTasks.map(task => (
          <tr key={task._id} className="bg-white border border-blue-500">
            <td className="px-4 py-2 border border-blue-500">{task.taskTitle}</td>
            <td className="px-4 py-2 border border-blue-500">{task.equipmentFacility}</td>
            <td className="px-4 py-2 border border-blue-500">{task.maintenanceType}</td>
            <td className="px-4 py-2">{formatDateTime(task.scheduledDateTime)}</td>
            <td className="px-4 py-2 border border-blue-500">{task.duration}</td>
            <td className="px-4 py-2 border border-blue-500">{task.assignedTechnician}</td>
            <td className="px-4 py-2 border border-blue-500">{task.assignedTechnicianContact}</td>
            <td className="px-4 py-2 border border-blue-500">{task.priority}</td>
            <td className="px-4 py-2 border border-blue-500">{task.costEstimation}</td>
            <td className="px-4 py-2 border border-blue-500">{task.description}</td>
            <td className="px-4 py-2 border border-blue-500">{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  

  );
};

export default MaintenanceListPage;
