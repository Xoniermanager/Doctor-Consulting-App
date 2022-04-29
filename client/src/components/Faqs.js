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
	let half = [];
  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : "Faq's" }} />
       <section className="section-sp3">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="accordion ttr-accordion1" id="accordionRow1">
							<FaqItem />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="accordion ttr-accordion1" id="accordionRow2">
							<FaqItem />
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