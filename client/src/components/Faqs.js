import React, { useEffect } from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import PageTitle from './Layout/PageTitle';
import FaqItem from './FaqItem';
import { useDispatch, useSelector } from 'react-redux';
import { getFaqs } from '../Actions/Admin';

const Faqs = () => {
	const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getFaqs());
    }, [dispatch]);
	let { loading, faqs } = useSelector((state) => state.faqs);
  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : "Faq's" }} />
       <section className="section-sp3">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="accordion ttr-accordion1" id="accordionRow1">
						{ faqs && faqs.map((faq, index)=>(
						 index %2 !== 0 ?	(<div key={index} className="accordion-item">
								<h2 className="accordion-header" id={`heading${faq._id}`}>
									<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq._id}`} aria-expanded={index === 0 ? true : false} aria-controls={`collapse${faq._id}`}>{faq.faqQues}</button>
								</h2>
								<div id={`collapse${faq._id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${faq._id}`} data-bs-parent="#accordionRow1">
									<div className="accordion-body">
										<p className="mb-0">{faq.faqDescription}</p>
									</div>
								</div>
							</div>) : '' 
						))}
						</div>
					</div>
					<div className="col-lg-6">
						<div className="accordion ttr-accordion1" id="accordionRow2">
						{ faqs && faqs.map((faq, index)=>(
						 index %2 === 0 ?	(<div key={index} className="accordion-item">
								<h2 className="accordion-header" id={`heading${faq._id}`}>
									<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq._id}`} aria-expanded={index === 0 ? true : false} aria-controls={`collapse${faq._id}`}>{faq.faqQues}</button>
								</h2>
								<div id={`collapse${faq._id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${faq._id}`} data-bs-parent="#accordionRow2">
									<div className="accordion-body">
										<p className="mb-0">{faq.faqDescription}</p>
									</div>
								</div>
							</div>) : '' 
						))}
						</div>
					</div>
				</div>
			</div>
		</section>
      <Footer />
    </>
  )
}

export default Faqs