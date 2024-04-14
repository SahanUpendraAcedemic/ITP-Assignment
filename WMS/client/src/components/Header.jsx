// import { FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);
//   return (
//     <header className='bg-slate-200 shadow-md'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//         <Link to='/'>
//           <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//             <span className='text-slate-500'>Sahand</span>
//             <span className='text-slate-700'>Estate</span>
//           </h1>
//         </Link>
//         <form
//           onSubmit={handleSubmit}
//           className='bg-slate-100 p-3 rounded-lg flex items-center'
//         >
//           <input
//             type='text'
//             placeholder='Search...'
//             className='bg-transparent focus:outline-none w-24 sm:w-64'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button>
//             <FaSearch className='text-slate-600' />
//           </button>
//         </form>
//         <ul className='flex gap-4'>
//           <Link to='/'>
//             <li className='hidden sm:inline text-slate-700 hover:underline'>
//               Home
//             </li>
//           </Link>
//           <Link to='/about'>
//             <li className='hidden sm:inline text-slate-700 hover:underline'>
//               About
//             </li>
//           </Link>
//           <Link to='/profile'>
//             {currentUser ? (
//               <img
//                 className='rounded-full h-7 w-7 object-cover'
//                 src={currentUser.avatar}
//                 alt='profile'
//               />
             
//             ) : (
//               <li className=' text-slate-700 hover:underline'> Sign in</li>
//             )}
//           </Link>
//         </ul>
//       </div>
//     </header>
//   );
// }
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
   /* <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>

  
    /* </div> */

    
    <div className="headerclass fixed top-0 right-0 w-5/6 h-12 bg-gray-200 flex flex-row justify-between items-center px-20">
            <div className="search">
                <div className="search-bar flex items-center flex-row h-10 w-80 border border-gray-300 rounded-xl bg-gray-100">
                    <img src="https://img.icons8.com/ios/50/000000/search--v1.png" alt="Search Icon" style={{cursor: 'pointer', height: '30px', margin: '5px'}} />
                    <div className="svg-container w-10 h-10 border-r-2 border-gray-200 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path class="svg-path" d="M10.5074 0.298218C10.3153 0.107211 10.0554 0 9.78444 0C9.51351 0 9.25358 0.107211 9.06144 0.298218L5.37976 3.92862L1.74936 0.298218C1.55721 0.107211 1.29729 0 1.02636 0C0.755423 0 0.495499 0.107211 0.303352 0.298218C0.20723 0.393555 0.130936 0.506981 0.0788706 0.631952C0.0268055 0.756923 0 0.890967 0 1.02635C0 1.16173 0.0268055 1.29578 0.0788706 1.42075C0.130936 1.54572 0.20723 1.65914 0.303352 1.75448L4.65163 6.10276C4.74697 6.19888 4.86039 6.27517 4.98536 6.32724C5.11033 6.3793 5.24438 6.40611 5.37976 6.40611C5.51514 6.40611 5.64919 6.3793 5.77416 6.32724C5.89913 6.27517 6.01255 6.19888 6.10789 6.10276L10.5074 1.75448C10.6036 1.65914 10.6799 1.54572 10.7319 1.42075C10.784 1.29578 10.8108 1.16173 10.8108 1.02635C10.8108 0.890967 10.784 0.756923 10.7319 0.631952C10.6799 0.506981 10.6036 0.393555 10.5074 0.298218Z" fill="#408DFB"/>

                        </svg>
                    </div>
                    <input type="text" placeholder="Search" className="search-input border-none outline-none w-full h-full pl-5 text-base bg-transparent" />
                </div>
            </div>
            <div className="user-settings flex items-center justify-between  w-96 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                <path d="M21.0862 14.672C20.7409 14.3284 20.4671 13.9198 20.2807 13.4697C20.0943 13.0197 19.999 12.5371 20.0002 12.05V9C20.0002 6.61305 19.052 4.32387 17.3642 2.63604C15.6764 0.948211 13.3872 0 11.0002 0C8.61329 0 6.32411 0.948211 4.63628 2.63604C2.94845 4.32387 2.00024 6.61305 2.00024 9V12.05C2.00151 12.5371 1.90619 13.0197 1.71978 13.4697C1.53337 13.9198 1.25958 14.3284 0.914241 14.672C0.477713 15.1085 0.180428 15.6646 0.0599837 16.2701C-0.0604606 16.8755 0.00134595 17.5031 0.237587 18.0734C0.473828 18.6437 0.873891 19.1312 1.38718 19.4741C1.90047 19.817 2.50393 20 3.12124 20H6.10024C6.32976 21.1303 6.94297 22.1465 7.83598 22.8764C8.729 23.6063 9.84689 24.005 11.0002 24.005C12.1536 24.005 13.2715 23.6063 14.1645 22.8764C15.0575 22.1465 15.6707 21.1303 15.9002 20H18.8802C19.4975 20 20.101 19.817 20.6143 19.4741C21.1276 19.1312 21.5277 18.6437 21.7639 18.0734C22.0001 17.5031 22.0619 16.8755 21.9415 16.2701C21.8211 15.6646 21.5228 15.1085 21.0862 14.672ZM11.0002 22C10.382 21.9974 9.77961 21.8039 9.27554 21.4459C8.77147 21.0879 8.39032 20.5829 8.18424 20H13.8162C13.6102 20.5829 13.229 21.0879 12.7249 21.4459C12.2209 21.8039 11.6185 21.9974 11.0002 22ZM18.8792 18H3.12124C2.89943 18.0001 2.68257 17.9345 2.4981 17.8113C2.31363 17.6881 2.16984 17.513 2.08494 17.3081C2.00004 17.1032 1.97784 16.8777 2.02115 16.6601C2.06446 16.4426 2.17133 16.2428 2.32824 16.086C2.85989 15.5572 3.2814 14.9282 3.5684 14.2354C3.85539 13.5427 4.00217 12.7999 4.00024 12.05V9C4.00024 7.14348 4.73774 5.36301 6.05049 4.05025C7.36325 2.7375 9.14373 2 11.0002 2C12.8568 2 14.6372 2.7375 15.95 4.05025C17.2627 5.36301 18.0002 7.14348 18.0002 9V12.05C17.9983 12.7999 18.1451 13.5427 18.4321 14.2354C18.7191 14.9282 19.1406 15.5572 19.6722 16.086C19.8292 16.2428 19.936 16.4426 19.9793 16.6601C20.0226 16.8777 20.0004 17.1032 19.9155 17.3081C19.8306 17.513 19.6869 17.6881 19.5024 17.8113C19.3179 17.9345 19.101 18.0001 18.8792 18Z" fill="#606060"/>

                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#606060" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C20.1653 17.2553 20.3761 17.7643 20.3761 18.295C20.3761 18.8257 20.1653 19.3347 19.79 19.71C19.4147 20.0853 18.9057 20.2961 18.375 20.2961C17.8443 20.2961 17.3353 20.0853 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.74472 20.1653 6.23573 20.3761 5.705 20.3761C5.17427 20.3761 4.66528 20.1653 4.29 19.79C3.91472 19.4147 3.70389 18.9057 3.70389 18.375C3.70389 17.8443 3.91472 17.3353 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C3.83472 6.74472 3.62389 6.23573 3.62389 5.705C3.62389 5.17427 3.83472 4.66528 4.21 4.29C4.58528 3.91472 5.09427 3.70389 5.625 3.70389C6.15573 3.70389 6.66472 3.91472 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.2553 3.83472 17.7643 3.62389 18.295 3.62389C18.8257 3.62389 19.3347 3.83472 19.71 4.21C20.0853 4.58528 20.2961 5.09427 20.2961 5.625C20.2961 6.15573 20.0853 6.66472 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.58 9.604 20.172 9.997 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#606060" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

                </svg>
                <div className="ver-line border-r-2 border-gray-500 h-9"></div>
                <Link to='/profile'>
            {currentUser ? (
               <div className="user-name flex flex-row w-36 items-center justify-between">
                    <div>
                        <img src="https://img.icons8.com/ios/50/000000/user" alt="User" className="user-image h-9 w-9 rounded-full p-2 bg-gray-300" />
                    </div>
                    <div>
                        <p className="user-name-name text-gray-500 text-base font-semibold">{currentUser.username}</p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path class="svg-path" d="M10.5074 0.298218C10.3153 0.107211 10.0554 0 9.78444 0C9.51351 0 9.25358 0.107211 9.06144 0.298218L5.37976 3.92862L1.74936 0.298218C1.55721 0.107211 1.29729 0 1.02636 0C0.755423 0 0.495499 0.107211 0.303352 0.298218C0.20723 0.393555 0.130936 0.506981 0.0788706 0.631952C0.0268055 0.756923 0 0.890967 0 1.02635C0 1.16173 0.0268055 1.29578 0.0788706 1.42075C0.130936 1.54572 0.20723 1.65914 0.303352 1.75448L4.65163 6.10276C4.74697 6.19888 4.86039 6.27517 4.98536 6.32724C5.11033 6.3793 5.24438 6.40611 5.37976 6.40611C5.51514 6.40611 5.64919 6.3793 5.77416 6.32724C5.89913 6.27517 6.01255 6.19888 6.10789 6.10276L10.5074 1.75448C10.6036 1.65914 10.6799 1.54572 10.7319 1.42075C10.784 1.29578 10.8108 1.16173 10.8108 1.02635C10.8108 0.890967 10.784 0.756923 10.7319 0.631952C10.6799 0.506981 10.6036 0.393555 10.5074 0.298218Z" fill="#408DFB"/>
 
                        </svg>
                    </div>
                </div>
            ) : (
              <div>Sign In</div>
            )}
               </Link>
            </div>
        </div>
  );
}
