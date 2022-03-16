import React from 'react'

const Testimonial = () => {
  return (
    <>
        <section className="section-area section-sp3 testimonial-wraper">
			<div className="container">
				<div className="heading-bx text-center">
					<h6 className="title-ext text-secondary">Testimonial</h6>
					<h2 className="title m-b0">See What Are The Patients <br />Saying About us</h2>
				</div>
				<div className="row align-items-center">
					<div className="col-lg-6 text-center">
						<div className="thumb-wraper">
							<img className="bg-img" src={require('../images/testimonials/shape.png')} alt="" />
							<ul>
								<li data-member="1"><a href="#!"><img src={require('../images/testimonials/pic1.jpg')} alt=""/></a></li>
								<li data-member="2"><a href="#!"><img src={require('../images/testimonials/pic2.jpg')} alt=""/></a></li>
								<li data-member="3"><a href="#!"><img src={require('../images/testimonials/pic3.jpg')} alt=""/></a></li>
								<li data-member="4"><a href="#!"><img src={require('../images/testimonials/pic4.jpg')} alt=""/></a></li>
								<li data-member="5"><a href="#!"><img src={require('../images/testimonials/pic5.jpg')} alt=""/></a></li>
								<li data-member="6"><a href="#!"><img src={require('../images/testimonials/pic6.jpg')} alt=""/></a></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="swiper-container testimonial-slide">
							<div className="swiper-wrapper">
								<div className="swiper-slide" data-rel="1">
									<div className="testimonial-bx">
										<div className="testimonial-content">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecena ssuspendisse ultrices gravida.</p>
										</div>
										<div className="client-info">
											<h5 className="name">John Deo</h5>
											<p>patient</p>
										</div>
										<div className="quote-icon">
											<i className="fas fa-quote-left"></i>
										</div>
									</div>
								</div>
								<div className="swiper-slide" data-rel="2">
									<div className="testimonial-bx">
										<div className="testimonial-content">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecena ssuspendisse ultrices gravida.</p>
										</div>
										<div className="client-info">
											<h5 className="name">John Deo</h5>
											<p>patient</p>
										</div>
										<div className="quote-icon">
											<i className="fas fa-quote-left"></i>
										</div>
									</div>
								</div>
								<div className="swiper-slide" data-rel="3">
									<div className="testimonial-bx">
										<div className="testimonial-content">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecena ssuspendisse ultrices gravida.</p>
										</div>
										<div className="client-info">
											<h5 className="name">John Deo</h5>
											<p>patient</p>
										</div>
										<div className="quote-icon">
											<i className="fas fa-quote-left"></i>
										</div>
									</div>
								</div>
								<div className="swiper-slide" data-rel="4">
									<div className="testimonial-bx">
										<div className="testimonial-content">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecena ssuspendisse ultrices gravida.</p>
										</div>
										<div className="client-info">
											<h5 className="name">John Deo</h5>
											<p>patient</p>
										</div>
										<div className="quote-icon">
											<i className="fas fa-quote-left"></i>
										</div>
									</div>
								</div>
								<div className="swiper-slide" data-rel="5">
									<div className="testimonial-bx">
										<div className="testimonial-content">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecena ssuspendisse ultrices gravida.</p>
										</div>
										<div className="client-info">
											<h5 className="name">John Deo</h5>
											<p>patient</p>
										</div>
										<div className="quote-icon">
											<i className="fas fa-quote-left"></i>
										</div>
									</div>
								</div>
								<div className="swiper-slide" data-rel="6">
									<div className="testimonial-bx">
										<div className="testimonial-content">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecena ssuspendisse ultrices gravida.</p>
										</div>
										<div className="client-info">
											<h5 className="name">John Deo</h5>
											<p>patient</p>
										</div>
										<div className="quote-icon">
											<i className="fas fa-quote-left"></i>
										</div>
									</div>
								</div>
							</div>
							<div className="swiper-button-prev test-btn-prev"><i className="las la-arrow-left"></i></div>
							<div className="swiper-button-next test-btn-next"><i className="las la-arrow-right"></i></div>
							<div className="swiper-pagination"></div>
						</div>
					</div>
				</div>
			</div>
			<img className="pt-img1 animate1"  src={require('../images/shap/plus-orange.png')} alt="" />
			<img className="pt-img2 animate2"  src={require('../images/shap/square-blue.png')} alt="" />
			<img className="pt-img3 animate3"  src={require('../images/shap/circle-dots.png')} alt="" />
			<img className="pt-img4 animate4"  src={require('../images/shap/circle-orange-2.png')} alt="" />
		</section>
    </>
  )
}

export default Testimonial