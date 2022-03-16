import React from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import PageTitle from './Layout/PageTitle';
import BlogDiv from './BlogDiv';

const BlogGrid = () => {
  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : 'Blog Grid 3' }} />
      <section className="section-area section-sp1">
			 <div className="container">
				  <div className="row">
            <BlogDiv blogData={{name:'John deo', date:'21 July 2021', title:'Dental Care for Women is very important', image:'https://s.tmimgcdn.com/blog/wp-content/uploads/2019/01/Medical-Blog.jpg?x62314'}} />
            <BlogDiv blogData={{name:'John deo', date:'21 July 2021', title:'Dental Care for Women is very important', image:'https://s.tmimgcdn.com/blog/wp-content/uploads/2019/01/Medical-Blog.jpg?x62314'}} />
            <BlogDiv blogData={{name:'John deo', date:'21 July 2021', title:'Dental Care for Women is very important', image:'https://s.tmimgcdn.com/blog/wp-content/uploads/2019/01/Medical-Blog.jpg?x62314'}} />
				  </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default BlogGrid