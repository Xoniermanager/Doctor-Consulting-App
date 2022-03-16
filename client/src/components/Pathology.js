import React from 'react'
import Footer from './Layout/Footer'
import Header from './Layout/Header'
import PageTitle from './Layout/PageTitle'

const Pathology = () => {
  return (
    <>
    <Header />
    <PageTitle details={{ pTitle : 'Pathology' }} />
    <Footer />
  </>
  )
}

export default Pathology