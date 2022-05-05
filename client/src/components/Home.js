import React, { useEffect } from 'react';
import Banner from './Banner';
import About from './About';
import Section from './Section';
import Appointment from './Appointment';
import Service from './Service';
import Testimonial from './Testimonial';
import Blog from './Blog';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getNewses } from '../Actions/Admin';

const Home = () => {
  let { loading, newses } = useSelector((state) => state.newses);

  const dispatch = useDispatch();
  useEffect(async() => {
   await dispatch(getNewses());
  }, []);

  console.log('qweqwe',newses);
  
  return (
     <>
      <Header/>
        <Banner />
        <About />
        <Section />
        <Appointment />
        <Service />
        <Testimonial />
       {/* <Blog news={newses.length > 0 ? newses[0] : []} /> */}
      <Footer/>
    </>
  )
}

export default Home