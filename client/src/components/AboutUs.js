import React from 'react'
import About from './About'
import PageTitle from './Layout/PageTitle';

import Header from './Layout/Header';
import Footer from './Layout/Footer';

const AboutUs = () => {
  return (
    <>
       <Header />
        <PageTitle details={{ pTitle : 'About Us' }} />
        <About />
       <Footer />
    </>
  )
}

export default AboutUs