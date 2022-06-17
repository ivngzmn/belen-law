import React from 'react';

// import components
import Banner from './components/Banner';
import Testimonials from './components/Testimonials';
import Skills from './components/Skills';
import Team from './components/Team';
import Subscribe from './components/Subscribe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const App = () => {
  return (
    <div>
      <Banner />
      <Testimonials />
      <Skills />
      <Team />
      <Subscribe />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
