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
    <div className="container mx-auto mt-20 mr-20 overflow-auto">
  <div className='flex flex-col sm:flex-row justify-between mb-5'>
    <div className='w-full sm:w-auto mb-4 sm:mb-0'>
      <h1 className="text-3xl font-semibold">All Maintenance Tasks</h1>
    </div>
    <div className='w-full sm:w-auto mb-4 sm:mb-0 flex flex-wrap items-center'>
      <input type="text" placeholder="Search by Task Title" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full sm:w-auto mb-2 sm:mb-0 mr-0 sm:mr-2" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto h-10 mb-2 sm:mb-0 mr-0 sm:mr-2">
        Search
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto h-10 mb-2 sm:mb-0">
        Clear
      </button>   
    </div>
    <div className='w-full sm:w-auto flex justify-end'>
      <Link to="/add_maintance_task" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-50 h-10">
        Add Maintenance Task
      </Link>        
    </div>
  </div>
  <div className='overflow-x-auto'>
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
          <th className="px-4 py-2 border border-blue-500">Action</th>
        </tr>
      </thead>
      <tbody>
        {maintenanceTasks.map(task => (
          <tr key={task._id} className="bg-white border border-blue-500">
            <td className="px-4 py-2 border border-blue-500">{task.taskTitle}</td>
            <td className="px-4 py-2 border border-blue-500">{task.equipmentFacility}</td>
            <td className="px-4 py-2 border border-blue-500">{task.maintenanceType}</td>
            <td className="px-4 py-2 border border-blue-500">{formatDateTime(task.scheduledDateTime)}</td>
            <td className="px-4 py-2 border border-blue-500">{task.duration}</td>
            <td className="px-4 py-2 border border-blue-500">{task.assignedTechnician}</td>
            <td className="px-4 py-2 border border-blue-500">{task.assignedTechnicianContact}</td>
            <td className="px-4 py-2 border border-blue-500">{task.priority}</td>
            <td className="px-4 py-2 border border-blue-500">{task.costEstimation}</td>
            <td className="px-4 py-2 border border-blue-500">{task.description}</td>
            <td className="px-4 py-2 border border-blue-500">{task.status}</td>
            <td className="px-4 py-2 border border-blue-500 action">
              <div className='flex flex-row justify-between'>
                <button onClick={() => handleEditTask(task._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
                <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="flex justify-end mt-5"> 
    <button /*onClick={handleGenerateReport}*/ className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Generate Report
    </button>
  </div>
</div>

  

  );
};

export default MaintenanceListPage;
