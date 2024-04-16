import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

export default function WorkersAssignList() {
  const [workersShiftSchedules, setWorkersShiftSchedules] = useState([]);

  useEffect(() => {
    fetchWorkersShiftSchedules();
  }, []);

  const fetchWorkersShiftSchedules = async () => {
    try {
      const response = await axios.get('/api/workersShiftSchedule/');
      setWorkersShiftSchedules(response.data);
    } catch (error) {
      console.error('Error fetching worker shift schedules:', error);
    }
  };

  return (

   
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Workers Shift Schedules</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Shift Name</th>
            <th className="py-2 px-4 border">Worker IDs</th>
            <th className="py-2 px-4 border">Worker Names</th>
            <th className="py-2 px-4 border">Worker Type</th>
          </tr>
        </thead>
        <tbody>
          {workersShiftSchedules.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">No data available</td>
            </tr>
          ) : (
            workersShiftSchedules.map((schedule, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4 border">{schedule.shiftname}</td>
                <td className="py-2 px-4 border">{Array.isArray(schedule.id) ? schedule.id.join(', ') : schedule.id}</td>
                <td className="py-2 px-4 border">{Array.isArray(schedule.name) ? schedule.name.join(', ') : schedule.name}</td>
                <td className="py-2 px-4 border">{Array.isArray(schedule.type) ? schedule.type.join(', ') : schedule.type}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
