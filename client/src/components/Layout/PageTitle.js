import React from 'react';
import Background from '../../images/banner/img1.jpg';

const PageTitle = ({details}) => {
  return (
    <>
        <div className="banner-wraper">
			<div className="page-banner" style={{backgroundImage: "url(" + Background + ")"}}>
				<div className="container">
					<div className="page-banner-entry text-center">
						<h1>{details.pTitle}</h1>
						{/* <!-- Breadcrumb row --> */}
						<nav aria-label="breadcrumb" className="breadcrumb-row">
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><a href="index.html"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</a></li>
								<li className="breadcrumb-item active" aria-current="page">{details.pTitle}</li>
							</ul>
						</nav>
					</div>
				</div>
				<img className="pt-img1 animate-wave" src={require('../../images/shap/wave-blue.png')} alt="" />
				<img className="pt-img2 animate2" src={require('../../images/shap/circle-dots.png')} alt="" />
				<img className="pt-img3 animate-rotate" src={require('../../images/shap/plus-blue.png')} alt="" />
			</div>
			{/* <!-- Breadcrumb row END --> */}
		</div>
    </>
  )
}

export default PageTitle