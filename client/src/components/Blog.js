import React from 'react';
import Background from '../images/background/line-bg2.png';

const Blog = ({news}) => {
	return (
    <>
	{/* <Header /> */}
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
									<a href="/blog-details"><img src={news ? news.image.url : ''} alt=""/></a>
								</div>
								<div className="post-info">
									<h5 className="post-title"><a href="/blog-details">{news ?  news.newsTitle : ''}</a></h5>		
									<a href="/blog-details" className="btn btn-outline-primary btn-sm">Read More <i className="btn-icon-bx fas fa-chevron-right"></i></a>		
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
		{/* <Footer /> */}
    </>
  )
}

export default Blog