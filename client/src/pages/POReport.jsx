import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function POReport() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState(null); // Initialize with null
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const aboutContentRef = useRef(null);

  useEffect(() => {
    handleShowListings();
  }, []);

  const formatDate = (date) => {
    const createdAtDate = new Date(date);
    return createdAtDate.toLocaleDateString();
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!res.ok) { // Handle fetch errors
        throw new Error(data.message || 'Failed to fetch data');
      }
      setUserListings(data);
    } catch (error) {
      console.log(error.message);
      setUserListings([]); // Set empty array or handle error state accordingly
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      handleShowListings(); // Reset to original listings
    } else {
      const filteredListings = userListings.filter((listing) =>
        listing.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserListings(filteredListings);
    }
  };

  const handleFilterByDate = () => {
    const filteredListings = userListings.filter((listing) => {
      const listingDate = new Date(listing.createdAt);
      return listingDate >= new Date(startDate) && listingDate <= new Date(endDate);
    });
    setUserListings(filteredListings);
  };

  function downloadAsPdf() {
    const doc = new jsPDF();

    html2canvas(document.querySelector("#tableToPrint")).then((canvas) => { // Capture only the table
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('purchase_orders.pdf');
    });
  }

  return (
    <div className="p-3 w-3/5 mx-auto me-40" ref={aboutContentRef}>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      {loading && <p>Loading...</p>}
      {userListings && (
        <div className="flex flex-col gap-4">
          <h1 className="text-gray-700 font-roboto text-4xl mb-8">Purchase Orders</h1>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-400 py-2 px-4 rounded-md"
            />
            <button onClick={handleSearch} className="text-white uppercase bg-blue-500 px-2 rounded-md">
              Search By Name
            </button>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-400 py-2 px-4 rounded-md"
            />
             
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-400 py-2 px-4 rounded-md"
            />
           
            <button onClick={handleFilterByDate} className="text-white uppercase bg-blue-500 px-2 rounded-md">
              Filter By Date
            </button>
          </div>
          <table id="tableToPrint" className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-400 py-2 px-4">supplier Name</th>
                <th className="border border-gray-400 py-2 px-4">Item Name</th>
                <th className="border border-gray-400 py-2 px-4">Item Code</th>
                <th className="border border-gray-400 py-2 px-4">Order Quantity</th>
                <th className="border border-gray-400 py-2 px-4">Created Date</th>
                <th className="border border-gray-400 py-2 px-4">Last Update</th>
                <th className="border border-gray-400 py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {userListings.map((listing) => (
                <tr key={listing._id} className="border-b">
                  <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
                    {listing.supplierName}
                  </td>
                  <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
                    {listing.itemName}
                  </td>
                  <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
                    {listing.itemCode}
                  </td>
                  <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
                    {listing.orderQuentity}
                  </td>
                  <td className="py-2 px-4 border">
                    <Link
                      className="text-slate-700 font-semibold truncate flex-1"
                      to={`/listing/${listing._id}`}
                    >
                      {formatDate(listing.createdAt)}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border text-slate-700 font-semibold truncate flex-1">
                    {formatDate(listing.updatedAt)}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex flex-col item-center">
                      <button className="text-red-400 uppercase">Pending</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={downloadAsPdf} className="text-green-700 uppercase">
            Download As PDF
          </button>
        </div>
      )}
    </div>
  );
}
