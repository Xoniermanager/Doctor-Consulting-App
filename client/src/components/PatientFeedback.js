import React from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import PageTitle from './Layout/PageTitle';

const PatientFeedback = () => {
  return (
    <>
      <Header />
       <PageTitle details={{ pTitle : 'Patient Feedback' }} />
      <Footer />
    </>
  )
}

export default PatientFeedback