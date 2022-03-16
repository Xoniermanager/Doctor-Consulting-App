import React from 'react';
import Heading from './Heading';
import Feature from './Feature';
import Background from '../images/main-banner/bg1.jpg';

const Section = () => {
  return (
    <>
        <section className="section-area section-sp5 work-area" style={{ backgroundImage:  "url(" + Background + ")", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize:'100%'}}>
			<div className="container-sm">
             <Heading headData={{heading : 'Working Process', description : 'How we works?', longDescription: ''}} />
               <div className="row justify-content-center">
                <Feature featureData={{ featureNo : '01', featureTitle : 'Make Appointmnet', featureClass : '', featureDesc : 'It is a long established fact that a reader will be distracted by the readable content of.'}}/>
                <Feature featureData={{ featureNo : '02', featureTitle : 'Take Treatment', featureClass : 'active', featureDesc : 'It is a long established fact that a reader will be distracted by the readable content of.'}}/>
                <Feature featureData={{ featureNo : '03', featureTitle : 'Registration', featureClass : '', featureDesc : 'It is a long established fact that a reader will be distracted by the readable content of.'}}/>
              </div>
            </div>

            <img className="pt-img1 animate1" src={require('../images/shap/circle-orange.png')} alt="" />
			<img className="pt-img2 animate2" src={require('../images/shap/plus-orange.png')} alt="" />
			<img className="pt-img3 animate3" src={require('../images/shap/circle-dots.png')} alt="" />
        </section>
    </>
  )
}

export default Section