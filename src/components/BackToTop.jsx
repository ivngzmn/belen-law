import React, { useEffect, useState } from 'react';

import { animateScroll as scroll } from 'react-scroll';
import { FaChevronUp } from 'react-icons/fa';

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    show && (
      <button
        onClick={() => scrollToTop()}
        className='flex justify-center items-center fixed bottom-16 lg:bottom-8 right-8 w-12 h-12 bg-primary-hover rounded-sm cursor-pointer text-white text-sm z-10'
      >
        <FaChevronUp />
      </button>
    )
  );
};

export default BackToTop;
