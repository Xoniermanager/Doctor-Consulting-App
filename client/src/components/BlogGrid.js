import React, { useEffect } from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import PageTitle from './Layout/PageTitle';
import BlogDiv from './BlogDiv';
import { useDispatch, useSelector } from 'react-redux';
import { getNewses } from '../Actions/Admin';

const BlogGrid = () => {

  let { loading, newses } = useSelector((state) => state.newses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewses());
  }, [dispatch]);

  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : 'Blog Grid 3' }} />
      <section className="section-area section-sp1">
			 <div className="container">
				  <div className="row">
          {newses && newses.map((news)=>(
            <BlogDiv blogData={{name:'John deo', date:'21 July 2021', title:news.title, image: news.image.url}} />
          ))}
				  </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default BlogGrid