import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-blue-500 p-8 rounded-lg mt-44">
        <div className="flex flex-row justify-between mb-3">
          <div className="w-1/2">
            <h1 className="text-3xl font-bold mb-4">All Reports</h1>
          </div>
          <div className="w-1/2 flex justify-end mb-2">
            <Link to={``} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mr-2 rounded">
              Create
            </Link>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-blue-500 px-4 py-2">Report ID</th>
              <th className="border border-blue-500 px-4 py-2">Report Created By</th>
              <th className="border border-blue-500 px-4 py-2">Report Created Date</th>
              <th className="border border-blue-500 px-4 py-2">Month</th>
              <th className="border border-blue-500 px-4 py-2">Year</th>
              <th className="border border-blue-500 px-4 py-2">Overall Variance</th>
              <th className="border border-blue-500 px-4 py-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.reportId}>
                <td className="border border-blue-500 px-4 py-2">{report.reportId}</td>
                <td className="border border-blue-500 px-4 py-2">{report.createdBy}</td>
                <td className="border border-blue-500 px-4 py-2">{report.createdDate}</td>
                <td className="border border-blue-500 px-4 py-2">{report.month}</td>
                <td className="border border-blue-500 px-4 py-2">{report.year}</td>
                <td className="border border-blue-500 px-4 py-2">{report.overallVariance}</td>
                <td className="border border-blue-500 px-4 py-2">
                  <a href={report.downloadLink} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" download>
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
