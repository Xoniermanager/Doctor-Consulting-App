import React from 'react';
import Background from '../../images/background/footer.jpg';

const Footer = () => {
  return (
    <>
      <footer className="footer" style={{backgroundImage: "url(" + Background + ")"}}>
		{/* <!-- Footer Top --> */}
		<div className="footer-top">
			<div className="container">
				<div className="row">
					<div className="col-xl-3 col-lg-3 col-md-6">
						<div className="widget widget_info">
							<div className="footer-logo">
								<a href="index.html"><img src="images/logo.png" alt="" /></a>
							</div>
							<div className="ft-contact">
								<p>Lorem ipsum is dolor sit amet, csectetur adipiscing elit, dolore smod tempor incididunt ut labore et.</p>
								<div className="contact-bx">
									<div className="icon"><i className="fas fa-phone-alt"></i></div>
									<div className="contact-number">
										<span>Contact Us</span>
										<h4 className="number">+01 123 456 7890</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-3 col-6">
						<div className="widget footer_widget ml-50">
							<h3 className="footer-title">Quick Links</h3>
							<ul>
								<li><a href="about-us.html"><span>About Us</span></a></li>
								<li><a href="services.html"><span>Services</span></a></li>
								<li><a href="booking.html"><span>Booking</span></a></li>
								<li><a href="faq.html"><span>Faq's</span></a></li>
								<li><a href="blog-grid.html"><span>Blogs</span></a></li>
								<li><a href="team.html"><span>Out Team</span></a></li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-lg-3 col-6">
						<div className="widget footer_widget">
							<h3 className="footer-title">Our Service</h3>
							<ul>
								<li><a href="service-detail.html"><span>Dental Care</span></a></li>
								<li><a href="service-detail.html"><span>Cardiac Clinic</span></a></li>
								<li><a href="service-detail.html"><span>Massege Therapy</span></a></li>
								<li><a href="service-detail.html"><span>Cardiology</span></a></li>
								<li><a href="service-detail.html"><span>Precise Diagnosis</span></a></li>
								<li><a href="service-detail.html"><span>Abmbulance Services</span></a></li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-lg-3 col-md-6">
                        <div className="widget widget_form">
                            <h3 className="footer-title">Subcribe</h3>
							<form className="subscribe-form subscription-form mb-30" action="https://meditro.themetrades.com/html/demo/script/mailchamp.php" method="post">
								<div className="ajax-message"></div>
								<div className="input-group">
									<input name="email" required="required" className="form-control" placeholder="Email Address" type="email" />
								</div>
								<button name="submit" value="Submit" type="submit" className="btn btn-secondary shadow w-100">Subscribe Now</button>	
							</form>
							<div className="footer-social-link">
								<ul>
									<li><a target="_blank" href="https://www.facebook.com/"><img src={require('../../images/social/facebook.png')} alt=""/></a></li>
									<li><a target="_blank" href="https://twitter.com/"><img src={require('../../images/social/twitter.png')} alt=""/></a></li>
									<li><a target="_blank" href="https://www.instagram.com/"><img src={require('../../images/social/instagram.png')} alt=""/></a></li>
									<li><a target="_blank" href="https://www.linkedin.com/"><img src={require('../../images/social/linkedin.png')} alt=""/></a></li>
								</ul>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
		{/* <!-- footer bottom --> */}
		<div className="container">
			<div className="footer-bottom">
                <div className="row">
                    <div className="col-12 text-center">
						<p className="copyright-text">Copyright © 2022 Design & Developed by <a href="https://themeforest.net/user/themetrades" target="_blank" className="text-secondary">ThemeTrades</a></p>
					</div>
                </div>
            </div>
		</div>
		{/* <!-- footer-shape --> */}
		<img className="pt-img1 animate-wave" src={require('../../images/shap/wave-blue.png')} alt="" />
		<img className="pt-img2 animate1" src={require('../../images/shap/circle-dots.png')} alt="" />
		<img className="pt-img3 animate-rotate" src={require('../../images/shap/plus-blue.png')} alt="" />
		<img className="pt-img4 animate-wave" src={require('../../images/shap/wave-blue.png')} alt="" />
	</footer>
    {/* <!-- Footer END ==== --> */}
	<button className="back-to-top fa fa-chevron-up"></button>
  </>
  )
}

export default Footer