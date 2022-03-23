import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import './JoinMeeting.css';

const JoinMeeting = () => {
  return (
    <>
    <Header />
    <div class="page-content bg-white"> 	
        <section className="section-area section-p3 appointment-wraper section-sp1">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6 mt-5">
							<h2 className="ttr-title mt-5">Premium video meetings.</h2>
							<h2 className="ttr-title mb-3">Now free for everyone.</h2>
							<p>We re-engineered the service we built for secure business meetings, Google Meet, to make it 
							free and available for all.</p>			  
							<Link to="/video-chat" className="btn btn-primary mt-4"><i className="fa fa-video"></i> New Meeting</Link>
							<Link to="/video-chat" className="btn p-2 mt-4"> 
								<div className="input-group my-input-grp">
									<div className="input-group-prepend">
										<div className="input-group-text"><i className="fa fa-keyboard" aria-hidden="true"></i>
										</div>
									</div>
									<input type="text" className="form-control border" placeholder="Enter a code or link" />
								</div>
                             </Link>
							<Link to="/video-chat" className="btn p-2 mt-4 text-primary">Join</Link>
							</div>  
							<div className="col-md-6">
								<div className="card"> 
									<div className="card-body shadow">
										<img src={require('../../images/meeting.png')} className="img-fluid" />
									</div>	
								</div>					
							</div>					
						</div>					
					</div>
				</section>
            </div>
        <Footer />
    </>
  )
}

export default JoinMeeting