import React from 'react';
import Background from '../images/background/line-bg2.png';

import Header from './Layout/Header';
import Footer from './Layout/Footer';

const Blog = () => {
  return (
    <>
	<Header />
     <section className="section-area section-sp1 blog-area" style={{backgroundImage: "url(" + Background + ")" , backgroundPosition: 'center', backgroundSize: 'cover'}}>
			<div className="container">
				<div className="heading-bx text-center">
					<h6 className="title-ext text-secondary">Latest News</h6>
					<h2 className="title">Our Latest News</h2>
				</div>
				<div className="swiper-container blog-slide">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<div className="blog-card">
								<div className="post-media">
									<a href="blog-details.html"><img src={require('../images/blog/grid/pic1.jpg')} alt=""/></a>
								</div>
								<div className="post-info">
									<ul className="post-meta">
										<li className="author"><a href="blog-details.html"><img src={require('../images/testimonials/pic1.jpg')} alt="" /> John deo</a></li>
										<li className="date"><i className="far fa-calendar-alt"></i> 21 July 2021</li>
									</ul>
									<h5 className="post-title"><a href="blog-details.html">In this hospital there are special surgeon</a></h5>		
									<a href="blog-details.html" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></a>		
								</div>
							</div>							
						</div>
						<div className="swiper-slide">
							<div className="blog-card">
								<div className="post-media">
									<a href="blog-details.html"><img src={require('../images/blog/grid/pic2.jpg')} alt="" /></a>
								</div>
								<div className="post-info">
									<ul className="post-meta">
										<li className="author"><a href="blog-details.html"><img src={require('../images/testimonials/pic2.jpg')} alt="" /> Peter Packer</a></li>
										<li className="date"><i className="far fa-calendar-alt"></i> 20 July 2021</li>
									</ul>
									<h5 className="post-title"><a href="blog-details.html">Can you get a diflucan prescription online?</a></h5>		
									<a href="blog-details.html" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></a>			
								</div>
							</div>
						</div>
						<div className="swiper-slide">
							<div className="blog-card">
								<div className="post-media">
									<a href="blog-details.html"><img src={require('../images/blog/grid/pic3.jpg')} alt="" /></a>
								</div>
								<div className="post-info">
									<ul className="post-meta">
										<li className="author"><a href="blog-details.html"><img src={require('../images/testimonials/pic3.jpg')} alt="" /> Sonar Moyna</a></li>
										<li className="date"><i className="far fa-calendar-alt"></i> 19 July 2021</li>
									</ul>
									<h5 className="post-title"><a href="blog-details.html">Why Is Skin Surgeon Considered Underrated</a></h5>		
									<a href="blog-details.html" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></a>		
								</div>
							</div>
						</div>
						<div className="swiper-slide">
							<div className="blog-card">
								<div className="post-media">
									<a href="blog-details.html"><img src={require('../images/blog/grid/pic4.jpg')} alt="" /></a>
								</div>
								<div className="post-info">
									<ul className="post-meta">
										<li className="author"><a href="blog-details.html"><img src={require('../images/testimonials/pic4.jpg')} alt="" /> Kalina Mollika</a></li>
										<li className="date"><i className="far fa-calendar-alt"></i> 18 July 2021</li>
									</ul>
									<h5 className="post-title"><a href="blog-details.html">Dental Care for Women is very important</a></h5>		
									<a href="blog-details.html" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></a>		
								</div>
							</div>						
						</div>
						<div className="swiper-slide">
							<div className="blog-card">
								<div className="post-media">
									<a href="blog-details.html"><img src={require('../images/blog/grid/pic5.jpg')} alt="" /></a>
								</div>
								<div className="post-info">
									<ul className="post-meta">
										<li className="author"><a href="blog-details.html"><img src={require('../images/testimonials/pic5.jpg')} alt="" /> Michel </a></li>
										<li className="date"><i className="far fa-calendar-alt"></i> 17 July 2021</li>
									</ul>
									<h5 className="post-title"><a href="blog-details.html">Health Will Be A Thing Of The Past And Here's Why</a></h5>		
									<a href="blog-details.html" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></a>		
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<img className="pt-img1 animate1" src={require('../images/shap/trangle-orange.png')} alt="" />
			<img className="pt-img2 animate2" src={require('../images/shap/square-dots-orange.png')} alt="" />
			<img className="pt-img3 animate-rotate" src={require('../images/shap/line-circle-blue.png')} alt="" />
			<img className="pt-img4 animate-wave" src={require('../images/shap/wave-blue.png')} alt="" />
		</section>
		<Footer />
    </>
  )
}

export default Blog