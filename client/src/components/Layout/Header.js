import React from 'react';
import { Button } from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Header = () => {
	const token = localStorage.getItem('token');
	const history = useNavigate();

	let { user } = useSelector((state) => state.user);
	const alert = useAlert();

	const logoutHandler = () => {
		localStorage.setItem('token','');
		user = null;
		alert.success("Logged out successfully");
		history('/login');
	 };

  return (
    <>
	{/* <!-- header --> */}
	<header className="header header-transparent rs-nav">
		{/* <!-- main header --> */}
		<div className="sticky-header navbar-expand-lg">
			<div className="menu-bar clearfix">
				<div className="container-fluid clearfix">
					{/* <!-- website logo --> */}
					<div className="menu-logo logo-dark">
						<Link to="/"><img src={logo} alt="" /></Link>
					</div>
					{/* <!-- nav toggle button --> */}
					<button className="navbar-toggler collapsed menuicon justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#menuDropdown" aria-controls="menuDropdown" aria-expanded="false" aria-label="Toggle navigation">
						<span></span>
						<span></span>
						<span></span>
					</button>

					<div class="secondary-menu">
						<ul>
						{/* <li class="btn-area"> <Button onClick={logoutHandler} className="btn btn-primary shadow" variant="contained">Logout</Button> </li> */}
							{ token && token !=='' ? (<li><Link to="#!"> User <i className="fas fa-plus"></i></Link>
								<ul className="sub-menu left">
								{ user && user.role === 'patient' ? (<li><Link to="/patient"><span>Profile</span></Link></li>) : (<li><Link to="/doctor"><span>Profile</span></Link></li>)}	
									<li><Link to="#" onClick={logoutHandler}><span>Logout</span></Link></li>
								</ul>
							</li>) : (	<li class="btn-area"><Link to="/login" className="btn btn-primary shadow">Login / Register <i class="btn-icon-bx fas fa-chevron-right"></i></Link></li>)
							}	
						</ul>
					</div>

					<div className="menu-links navbar-collapse collapse justify-content-end" id="menuDropdown">
						<div className="menu-logo">
							<Link to="/"><img src={require('../../images/logo-white.png')} alt="" /></Link>
						</div>
						<ul className="nav navbar-nav">	
							<li className="active"><Link to="/">Home</Link></li>
							<li>
								<Link to="#!">Pages<i className="fas fa-plus"></i></Link>
								<ul className="sub-menu">
									<li className="add-menu-left">
										<ul>
											<li><Link to="/about-us"><span>About Us</span></Link></li>
											<li><Link to="/contact-us"><span>Contact Us</span></Link></li>
											<li><Link to="/team"><span>Our Team</span></Link></li>
											<li><Link to="/faqs"><span>FAQ's</span></Link></li>
											<li><Link to="/book-appointment"><span>Booking</span></Link></li>
											<li><Link to="/patient-feedback"><span>Patient Feedback</span></Link></li>
										</ul>
									</li>
								</ul>
							</li>
							<li className=""><Link to="/book-appointment">Book An Appointment</Link></li>
							<li className=""><Link to="/pathology">Pathology</Link></li>
							
							<li><Link to="#!">Blog <i className="fas fa-plus"></i></Link>
								<ul className="sub-menu left">
									<li><Link to="/blog-grid"><span>Blogs</span></Link></li>
									<li><Link to="/blog-details"><span>Blog Details</span></Link></li>
								</ul>
							</li>
						</ul>
					</div>
					{/* <!-- Navigation Menu END ==== --> */}
				</div>
			</div>
		</div>
		{/* <!-- main header END --> */}
	</header>
	{/* <!-- header END --> */}
    </>
  )
}

export default Header