import React from 'react';
import { Link } from 'react-router-dom';

const BlogDiv = ({blogData}) => {
  return (
    <div className="col-xl-4 col-md-6">
        <div className="blog-card mb-30">
            <div className="post-media">
                <Link to="/blog-details"><img src={blogData.image} alt="" /></Link>
            </div>
            <div className="post-info">
                <ul className="post-meta">
                    <li className="author"><Link to="/blog-details"><img src={blogData.image} alt="" /> {blogData.name}</Link></li>
                    <li className="date"><i className="far fa-calendar-alt"></i>{blogData.date}</li>
                </ul>
                <h4 className="post-title"><Link to="/blog-details">{blogData.title}</Link></h4>		
                <Link to="/blog-details" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></Link>		
            </div>
        </div>							
    </div>
  )
}

export default BlogDiv