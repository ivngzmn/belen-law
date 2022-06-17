import React from 'react';

// import components
import TestimonialSlider from './TestimonialSlider';

const Testimonials = () => {
  return (
    <section className='h-1/2 pb-10'>
      <div className='container mx-auto h-full flex items-center justify-end '>
        <div className='w-full mx-auto lg:mx-0 lg:max-w-[570px]'>
          <h3 className='text-5xl font-primary font-extrabold pt-24 text-center lg:text-left'>
            What our clients say about us.
          </h3>
          <TestimonialSlider />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
