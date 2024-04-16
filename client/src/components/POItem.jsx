import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function POItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        
        <div className='p-3 flex flex-col gap-2 w-full'>
         
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <div className='flex items-center gap-1'>
            
          </div>
          <p className='text-sm text-gray-600 truncate w-full'>
              {listing.supplierName}
            </p>
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.itemCode}
            </p>
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.itemName}
            </p>
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.orderQuentity}
            </p>
         
          
        </div>
      </Link>
    </div>
  );
}