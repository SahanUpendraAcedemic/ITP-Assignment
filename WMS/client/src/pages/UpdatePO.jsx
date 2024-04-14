import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdatePO() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
 
  const [formData, setFormData] = useState({
  
    
    supplierName: '',
     itemCode: '',
     itemName: '',
     orderQuentity: '',
    
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);



  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/display`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto mt-12 w-2/4 px-4 me-64">
      <div className="text-gray-700 font-roboto text-4xl mb-8">
        Update Purchase Order
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        
        <div className="flex items-center mb-6">
          <label htmlFor="supplierName" className="text-red-500 w-48" >Supplier Name</label>
          <input  type="text" id="supplierName" name="supplierName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          required
          
          onChange={handleChange}
          value={formData.supplierName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
          <input   type="text" id="itemCode" name="itemCode" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          
          onChange={handleChange}
          value={formData.itemCode}
          />
        </div>

        <div className="flex items-center mb-6">
          <label htmlFor="itemname" className="text-red-500 w-48">Item Name</label>
          <input  type="text" id="itemName" name="itemName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
          required
          
          onChange={handleChange}
          value={formData.itemName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="orderQuentity" className="text-red-500 w-48">Order Quentity</label>
          <input  min='1' max='1000' type="Number" id="orderQuentity" name="orderQuentity" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          required
          
          onChange={handleChange}
          value={formData.orderQuentity}
          />
        </div>
       

        <div className="flex justify-between ml-64 mt-4">
          <button className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none"> {loading ? 'Updating...' : 'Update PO'}</button>
        </div>
      </form>

      {/* Check Current Stock Section */}
      <div className="mt-12">
        <div className="text-gray-700 font-roboto text-4xl mb-6">
          Check Current Stock
        </div>
        <div className="p-4 border rounded-lg">
          <form action="https://www.youtube.com/" method="get" className="flex justify-between">
            <div className="flex items-center">
              <div className="mr-4 text-gray-700 font-roboto text-md">Item Name</div>
              <input type="text" className="w-64 h-10 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-base bg-gray-100 focus:outline-none" placeholder="Search By Item Name" />
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-gray-700 font-roboto text-md">Item Code</div>
              <input type="text" className="w-32 h-10 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-base bg-gray-100 focus:outline-none" placeholder="#" />
            </div>
            <button className="w-24 h-10 flex items-center justify-center rounded-md bg-blue-500 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-blue-700 focus:outline-none" type="submit">Search
            <svg width="20" height="25" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 ">
                    <path d="M27.6278 25.6395L22.433 20.4866C24.4494 17.9724 25.426 14.7811 25.1618 11.569C24.8975 8.35686 23.4127 5.36804 21.0125 3.21709C18.6123 1.06615 15.4791 -0.083439 12.2574 0.00472013C9.03561 0.0928793 5.97006 1.41208 3.69107 3.69107C1.41208 5.97006 0.0928793 9.03561 0.00472013 12.2574C-0.083439 15.4791 1.06615 18.6122 3.21709 21.0125C5.36804 23.4127 8.35686 24.8975 11.569 25.1617C14.7811 25.426 17.9724 24.4494 20.4866 22.433L25.6395 27.5858C25.7697 27.7171 25.9245 27.8212 26.0952 27.8923C26.2658 27.9634 26.4488 28 26.6337 28C26.8185 28 27.0015 27.9634 27.1722 27.8923C27.3428 27.8212 27.4977 27.7171 27.6278 27.5858C27.8802 27.3247 28.0213 26.9758 28.0213 26.6127C28.0213 26.2495 27.8802 25.9006 27.6278 25.6395ZM12.6313 22.433C10.6928 22.433 8.79773 21.8581 7.18586 20.7811C5.57399 19.7041 4.31769 18.1733 3.57583 16.3823C2.83397 14.5913 2.63987 12.6205 3.01806 10.7191C3.39626 8.81782 4.32977 7.07134 5.70056 5.70056C7.07134 4.32977 8.81782 3.39626 10.7191 3.01806C12.6205 2.63987 14.5913 2.83397 16.3823 3.57583C18.1733 4.31769 19.7041 5.57399 20.7811 7.18586C21.8581 8.79773 22.433 10.6928 22.433 12.6313C22.433 15.2309 21.4003 17.724 19.5621 19.5621C17.724 21.4003 15.2309 22.433 12.6313 22.433Z" fill="white"/>
                    </svg>
            </button>
          </form>

          {/* Table Section */}
          <div className="mt-8">
            <table className="w-full text-left border-collapse font-roboto font-normal text-base">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-400 py-2 px-4">Index</th>
                  <th className="border border-gray-400 py-2 px-4">Item Name</th>
                  <th className="border border-gray-400 py-2 px-4">Item Code</th>
                  <th className="border border-gray-400 py-2 px-4">Supplier Code</th>
                  <th className="border border-gray-400 py-2 px-4">Current Qty</th>
                  <th className="border border-gray-400 py-2 px-4">Min Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700">
                  <td className="border border-gray-400 py-2 px-4">1</td>
                  <td className="border border-gray-400 py-2 px-4">Item Name 1</td>
                  <td className="border border-gray-400 py-2 px-4 text-blue-500 underline">Item code 1</td>
                  <td className="border border-gray-400 py-2 px-4 text-blue-500 underline">Supplier code 1</td>
                  <td className="border border-gray-400 py-2 px-4">Current Qty 1</td>
                  <td className="border border-gray-400 py-2 px-4">Min Level 1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


