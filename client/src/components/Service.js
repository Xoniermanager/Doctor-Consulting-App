import React from 'react';
import Heading from './Heading';
import SlideSide from './SlideSide';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

const Service = () => {
  return (
    <>
     {/* <Header /> */}
      <section className="section-area section-sp1 service-wraper">
			<div className="row align-items-center">
				<div className="col-xl-4 col-lg-7 mb-30">	
                <Heading headData={{heading : 'Services', description : 'We Cover A Big Variety Of Medical Services', longDescription: 'We provide the special tips and advice is of heath care treatment and high level of best.'}} />
				<a href="services.html" className="btn btn-secondary btn-lg shadow">All Services</a>
				</div>
				<div className="col-xl-8 mb-15">	
					<div className="swiper-container service-slide">
						<div className="swiper-wrapper"></div> 
                        <SlideSide slideData={{title: 'Diagnostics', description:'Phasellus venenatis porta rhoncus. Integer et viverra felis.'}} />
                        {/* <SlideSide slideData={{title: 'Treatment', description:'Phasellus venenatis porta rhoncus. Integer et viverra felis.'}} />
                        <SlideSide slideData={{title: 'Surgery', description:'Phasellus venenatis porta rhoncus. Integer et viverra felis.'}} />
                        <SlideSide slideData={{title: 'Vaccine', description:'Phasellus venenatis porta rhoncus. Integer et viverra felis.'}} />
                        <SlideSide slideData={{title: 'Emergency', description:'Phasellus venenatis porta rhoncus. Integer et viverra felis.'}} /> */}

                    </div>
                </div>
            </div>
            <img className="pt-img1 animate-rotate" src={require('../images/shap/line-circle-blue.png')} alt="" />
			<img className="pt-img2 animate2" src={require('../images/shap/square-dots-orange.png')} alt="" />
			<img className="pt-img3 animate-wave" src={require('../images/shap/wave-blue.png')} alt="" />
			<img className="pt-img4 animate1" src={require('../images/shap/square-rotate.png')} alt="" />
        </section>
       {/* <Footer /> */}
    </>
  )
}

export default Service