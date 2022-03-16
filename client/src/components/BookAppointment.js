import React from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import PageTitle from './Layout/PageTitle';

const Bookings = () => {
  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : 'Book An Appointment' }} />
      <Footer />
    </>
  )
}

export default Bookings