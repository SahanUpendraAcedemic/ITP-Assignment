import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf'; // Correct import syntax for jsPDF
import html2canvas from 'html2canvas';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Display() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const aboutContentRef = useRef(null);
  useEffect(() => {
    handleShowListings(); // Automatically calls the function when component mounts
  }, []);

  const formatDate = (date) => {
    // Convert the date string to a Date object
    const createdAtDate = new Date(date);
  
    // Format the date to display only the date portion
    const formattedDate = createdAtDate.toLocaleDateString();
  
    return formattedDate;
  };
  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePerc(Math.round(progress));
//       },
//       (error) => {
//         setFileUploadError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, avatar: downloadURL })
//         );
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());
//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(data.message));
//     }
//   };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  function downloadAsPdf() {
    const doc = new jsPDF();
  
    // Capture the entire document body
    html2canvas(document.body).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save('whole_page.pdf');
    });
  }
  
  return (
    <div className='p-3 w-2/4  mx-auto me-64' ref={aboutContentRef}>
     

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''} 
      </p>

      {userListings && userListings.length >= 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-gray-700 font-roboto text-4xl mb-8'>
            Purchase Orders
          </h1>
          
          <table className="w-full border-collapse"   >
  <thead>
    <tr className="bg-gray-200 text-gray-700">
      
      <th className="border border-gray-400 py-2 px-4">supplier Name</th>
      <th className="border border-gray-400 py-2 px-4">Created Date</th>
      <th className="border border-gray-400 py-2 px-4">Last Update</th>
      <th className="border border-gray-400 py-2 px-4">Status</th>
      <th className="border border-gray-400 py-2 px-4"></th>
      <th className="border border-gray-400 py-2 px-4"></th>
     

    </tr>
  </thead>
  <tbody>
    {userListings.map((listing) => (
      <tr key={listing._id} className="border-b">
       
        <td className="py-2 px-4 border">
         
            {listing.supplierName}
          
        </td>
        <td className="py-2 px-4 border">
           <Link
            className="text-slate-700 font-semibold  truncate flex-1"
            to={`/listing/${listing._id}`}
          > 
            {formatDate(listing.createdAt)}
          </Link> 
        </td>
        <td className="py-2 px-4 border">
          {/* <Link
            className="text-slate-700 font-semibold truncate flex-1"
            to={`/listing/${listing._id}`}
          > */}
            {formatDate(listing.updatedAt)}
          {/* </Link> */}
        </td>
        <td className="py-2 px-4 border">
        <div className="flex flex-col item-center">
            
            <button className="text-red-4 00 uppercase">Pending</button>
         
        </div>
        </td>
          
        <td className="py-2 px-4 border">
          <div className="flex flex-col item-center">
            <button
              onClick={() => handleListingDelete(listing._id)}
              className="text-red-700 uppercase"
            >
              Delete
            </button>
            
          </div>
        </td>
        <td className="py-2 px-4 border">
          <div className="flex flex-col item-center">
            <Link to={`/update-listing/${listing._id}`}>
              <button className="text-green-700 uppercase">Edit</button>
            </Link>
          </div>
        </td>
        
      </tr>
    ))}
  </tbody>
</table>
<button onClick={downloadAsPdf} className='text-green-700 uppercase'>Download As PDF</button>

        </div>
      )}
    </div>
  );
}
