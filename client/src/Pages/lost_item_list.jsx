import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/lostItem/lost_item_list');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);
  

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/lostItem/delete_lost_item/${id}`, {
        method: 'DELETE'
      });
      const response = await fetch('/api/lostItem/lost_item_list');
      const data = await response.json();
      setItems(data);
      alert('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const handleGenerateReport = async () => {
    try {
      // Filtered items to be included in the report
      const itemsToInclude = filteredItems.map(item => {
        // Remove specific properties from each item
        const { _id, createdDate, updatedAt, createdAt, ...itemWithoutMeta } = item;
        return itemWithoutMeta;
      });
  
      // Define cell padding or additional characters for each column
      const columnWidths = {
        itemId: 55, // Example: set the width for itemId to 10 characters
        itemName: 60,
        itemType:55,
        physicalQuantity:55,
        variance :55,
        description:55
       
      };
  
      // Format column names with padding
      const columnNames = Object.keys(itemsToInclude[0]).map(column => {
        const width = columnWidths[column] || column.length;
        return column.padEnd(width);
      }).join(',');
  
      // Convert the items to a CSV string with padding
      const csvContent = itemsToInclude.map(item => {
        return Object.values(item).map((value, index) => {
          const column = Object.keys(item)[index];
          const width = columnWidths[column] || column.length;
          return String(value).padEnd(width); // Pad the value to match column width
        }).join(',');
      }).join('\n');
  
      // Combine column names and item data
      const fullCsvContent = `${columnNames}\n${csvContent}`;
  
      // Create a Blob containing the CSV data
      const blob = new Blob([fullCsvContent], { type: 'text/csv;charset=utf-8' });
  
      // Create a download link for the Blob
      const currentDate = new Date();
      const fileName = `lost_item_list_${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${currentDate.getDate()}.csv`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
  
      // Trigger the download
      link.click();
  
      // Clean up
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const filteredItems = items.filter(item => {
    const itemDate = new Date(item.createdDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return itemDate >= start && itemDate <= end;
    } else if (start) {
      return itemDate >= start;
    } else if (end) {
      return itemDate <= end;
    }

    return true;
  });

  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-blue-500 p-8 rounded-lg mt-44">
        <div className="flex flex-row justify-between">
          <div className="w-1/2">
            <h1 className="text-3xl font-bold mb-6">All lost Items</h1>
          </div>
          <div className="w-1/2 flex justify-end mb-5 items-center">
            <div className="mr-4">
              <label htmlFor="startDate" className="mr-2">Start Date:</label>
              <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mr-4">
              <label htmlFor="endDate" className="mr-2">End Date:</label>
              <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
            </div>
            <Link to={`/add_lost_item`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
              Add item
            </Link>
           
          </div>

        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-blue-500 px-4 py-2">Item ID</th>
              <th className="border border-blue-500 px-4 py-2">Item Name</th>
              <th className="border border-blue-500 px-4 py-2">Item Type</th>
              <th className="border border-blue-500 px-4 py-2">Physical Quantity</th>
              <th className="border border-blue-500 px-4 py-2">System Quantity</th>
              <th className="border border-blue-500 px-4 py-2">Variance</th>
              <th className="border border-blue-500 px-4 py-2">Description</th>
              <th className="border border-blue-500 px-4 py-2">Created Date</th>
              <th className="border border-blue-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td className="border border-blue-500 px-4 py-2">{item.itemId}</td>
                <td className="border border-blue-500 px-4 py-2">{item.itemName}</td>
                <td className="border border-blue-500 px-4 py-2">{item.itemType}</td>
                <td className="border border-blue-500 px-4 py-2">{item.physicalQuantity}</td>
                <td className="border border-blue-500 px-4 py-2">{item.systemQuantity}</td>
                <td className={`border border-blue-500 px-4 py-2 ${item.variance >= 0 ? 'text-green-500' : 'text-red-500'}`}>{item.variance}</td>
                <td className="border border-blue-500 px-4 py-2">{item.description}</td>
                <td className="border border-blue-500 px-4 py-2">{formatDate(item.createdDate)}</td>
                <td className="border border-blue-500 px-4 py-2">
                  <Link to={`/edit_lost_item/${item._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                    Update
                  </Link>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-5"> 
        <button onClick={handleGenerateReport} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Generate Report
            </button>

        </div>
      </div>
      
    </div>
  );
};

export default ItemsPage;
