import React from 'react';
import Banner from './Banner';
import About from './About';
import Section from './Section';
import Appointment from './Appointment';
import Service from './Service';
import Testimonial from './Testimonial';
import Blog from './Blog';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

const Home = () => {
  return (
     <>
      <Header/>
        <Banner />
        <About />
        <Section />
        <Appointment />
        <Service />
        <Testimonial />
        <Blog />
      <Footer/>
    </>
  )
}

export default Home