import React from 'react';
import Logo from '../assets/img/belen-logo.webp';
// import social
import { BsInstagram, BsFacebook, BsYoutube } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='bg-white py-[24px] text-primary text-sm text-center container mx-auto'>
      <img className='w-48 mx-auto pt-6' src={Logo} alt='Belen Gomez Logo' />
      {/* social */}
      <div className='flex items-center justify-center space-x-5 py-5 mx-auto max-w-[205px]'>
        <a
          href='https://www.facebook.com/attorneybelengomez/'
          className='text-accent hover:text-primary transition-all duration-300'
        >
          <BsFacebook className='w-6 h-6' />
        </a>
        <a
          href='https://www.instagram.com/abogadabelengomez/'
          className='text-accent hover:text-primary transition-all duration-300'
        >
          <BsInstagram className='w-6 h-6' />
        </a>
        <a
          href='https://www.youtube.com/channel/UCy_nslnKR2zKWKn2CnBMilg'
          className='text-accent hover:text-primary transition-all duration-300'
        >
          <BsYoutube className='w-6 h-6' />
        </a>
      </div>
      <div className='mx-auto'>&copy;2022 Belen Gomez, APC</div>
    </footer>
  );
};

export default Footer;
