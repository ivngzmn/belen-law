import React from 'react';

// import image
import Image from '../assets/img/belen-gomez.webp';

// import components
import Header from './Header';
import Appointment from './Appointment';

const Banner = () => {
  return (
    <section
      id='home'
      className='lg:h-full bg-gradient-to-t from-[#f8f3ec] to-[#e0c8ac] '
    >
      <Header />
      <div className='container mx-auto h-full lg:flex pt-32'>
        <div className='text-center mx-auto h-full lg:text-left px-8 md:p-0'>
          <h1 className='font-primary font-black text-5xl lg:text-7xl text-primary mb-4 lg:mt-[70px] leading-tight lg:leading-[90px]'>
            Law Office of
            <br /> <span className='text-accent'>Belen Gomez, APC</span>
          </h1>
          <p className='max-w-sm text-lg lg:text-2xl mx-auto mb-[50px] lg:mx-0 lg:max-w-[540px]'>
            Representation with Dignity. Immigration. Estate Planning.
          </p>
          {/* Appointment */}
          <div className='lg:absolute lg:block hidden mx-auto max-w-[445px] lg:mx-0 pb-10'>
            <Appointment />
          </div>
        </div>
        {/* Banner Image */}
        <div className='flex-1 lg:flex lg:flex-col items-end'>
          <img
            src={Image}
            alt='Belen Gomez in a black sport jacket and white collard shirt'
            className='lg:h-[38rem]'
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
