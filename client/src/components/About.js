import React from 'react';
import Heading from './Heading';
import Services from './Services';

const About = () => {
  return (
    <>
        <section className="section-sp1 about-area">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 mb-30">
						<div className="about-thumb-area">
							<ul>
								<li><img className="about-thumb1" src={require('../images/about/pic-1.jpg')} alt="" /></li>
								<li><img className="about-thumb2" src={require('../images/about/pic-2.jpg')} alt="" /></li>
								<li><img className="about-thumb3" src={require('../images/about/pic-3.jpg')} alt="" /></li>
								<li><div className="exp-bx">20<span>Year Experience</span></div></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-6 mb-30">
                       <Heading headData={{heading : 'About Us', headAlign : 'text-center', description : 'The Great Place Of Medical Hospital Center', longDescription : 'We provide the special tips and advice’s of heath care treatment and high level of best technology involve in the our hospital.'}} /> 
						<div className="row">
							<Services service={{ title : 'Emergency Help'}} />
                            <Services service={{ title : 'Qualified Doctors'}} />
                            <Services service={{ title : 'Best Professionals'}} />
                            <Services service={{ title : 'Medical Treatment'}} />
						</div>
						<a href="about-us.html" className="btn btn-primary shadow">Read More</a>
					</div>
				</div>
			</div>
			<img className="pt-img1 animate-wave" src={require('../images/shap/wave-orange.png')} alt="" />
			<img className="pt-img2 animate2" src={require('../images/shap/circle-small-blue.png')} alt="" />
			<img className="pt-img3 animate-rotate" src={require('../images/shap/line-circle-blue.png')} alt="" />
			<img className="pt-img4 animate-wave" src={require('../images/shap/square-dots-orange.png')} alt="" />
			<img className="pt-img5 animate2" src={require('../images/shap/square-blue.png')} alt="" />
		</section>
    </>
  )
}

export default About