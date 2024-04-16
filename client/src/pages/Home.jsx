import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/POItem';

export default function Home() {
  
  
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto pl-64'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Hi chaminda <span className='text-slate-500'>Have a nice day</span>
          <br />
          Explore your inventory
        </h1>
        
        
      </div>

      

      {/* listing results for offer, sale and rent */}

      
    </div>
  );
}
