import React from 'react'
import Background from '../images/main-banner/bg1.jpg'
const Banner = () => {
  return (
    <>
        <div className="main-banner" style={{backgroundImage: "url(" + Background + ")"}} >
			<div className="container inner-content">
				<div className="row align-items-center">
					<div className="col-lg-7 col-md-6 col-sm-7">
						<h6 className="title-ext text-primary">We Provide All Health Care Solution</h6>
						<h1>Protect Your Health And Take Care To Of Your Health</h1>
						<a href="about-us.html" className="btn btn-secondary btn-lg shadow">Read More</a>
					</div>
					<div className="col-lg-5 col-md-6 col-sm-5">
						<div className="banner-img">
							<img src={require('../images/main-banner/doctor.png')} alt="" />
						</div>
					</div>
				</div>
			</div>
			<img className="pt-img1 animate1" src={require('../images/shap/trangle-orange.png')} alt="" />
			<img className="pt-img2 animate2" src={require('../images/shap/square-blue.png')} alt="" />
			<img className="pt-img3 animate3" src={require('../images/shap/chicle-blue-2.png')} alt="" />
			<img className="pt-img4 animate4" src={require('../images/shap/plus-orange.png')} alt="" />
			<img className="pt-img5 animate-wave" src={require('../images/shap/wave-orange.png')} alt="" />
		</div>
    </>
  )
}

export default Banner