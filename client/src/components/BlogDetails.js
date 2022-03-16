import React from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import PageTitle from './Layout/PageTitle';

const BlogDetails = () => {
  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : 'Blog Details' }} />
      <Footer />
    </>
  )
}

export default BlogDetails