import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { Link } from 'react-router-dom';
import {
 
  FaShare,
} from 'react-icons/fa';
 import Contact from '../components/Contact';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function CurruntPO() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          {/* <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper> */}
          
         
          <div>
            
            <div className="mx-auto pt-20 w-2/4 px-4 me-64">
      <div className="text-gray-700 font-roboto text-4xl mb-12">
        Purchase Order Details
      </div>
      <form className="flex flex-col">
        
        <div className="flex items-center mb-6">
          <label htmlFor="supplierName" className="text-red-500 w-48" >Supplier Name</label>
          <input  type="text" id="supplierName" name="supplierName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          
          
          
          value={listing.supplierName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="itemCode" className="text-red-500 w-48">Item Code</label>
          <input   type="text" id="itemCode" name="itemCode" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
         
          
          
          value={listing.itemCode}
          />
        </div>

        <div className="flex items-center mb-6">
          <label htmlFor="itemname" className="text-red-500 w-48">Item Name</label>
          <input  type="text" id="itemName" name="itemName" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100"
         
          
          value={listing.itemName}
          />
        </div>
        <div className="flex items-center mb-6">
          <label htmlFor="orderQuentity" className="text-red-500 w-48">Order Quentity</label>
          <input  min='1' max='1000' type="Number" id="orderQuentity" name="orderQuentity" className="w-full h-12 border border-gray-300 rounded-md px-4 text-gray-700 font-roboto text-lg bg-gray-100" 
          
          
          value={listing.orderQuentity}
          />
        </div>
       

        <div className="flex justify-between ml-64 mt-4">
        <Link to={`/display`}>
              <button className="w-48 h-12 rounded-md bg-blue-700 text-white font-roboto font-semibold text-lg cursor-pointer  focus:outline-none">View Prevoius Orders</button>
            </Link>
          <Link to={`/update-po/${listing._id}`}>
              <button className="w-48 h-12 rounded-md bg-green-600 text-white font-roboto font-semibold text-lg cursor-pointer hover:bg-green-700 focus:outline-none">Edit</button>
            </Link>
        </div>
      </form>

      {/* Check Current Stock Section */}
      
    </div>
          </div>
         
        </div>
      )}
    </main>
  );
}
