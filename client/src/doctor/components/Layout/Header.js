import React, { useState } from 'react'
import './Style.css';
import logo from '../../../images/doc_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { toggleMenus } from '../../../Actions/User';

const Header = () => {

	const token = localStorage.getItem('token');
	const [mebOpen, setMebOpen] = useState(false);
	const {menuToggle} = useSelector((state)=>state.menuToggle);
	
	const dispatch = useDispatch();

	const {user} = useSelector((state)=>state.user);
	const history = useNavigate();
	const alert = useAlert();

	const logoutHandler = () => {
		localStorage.setItem('token','');
		alert.success("Logged out successfully");
		history('/login');
	 };

	const handleBurger = () =>{
		setMebOpen(!mebOpen);
		dispatch(toggleMenus(mebOpen));
	}

  return (
    <>
     {/* ******************* Nav header start ****************** */}
            <div className="nav-header">
            	<Link to="/doctor" className="brand-logo">
            		<img className="logo-abbr" src={logo} alt="Logo"/>
            	</Link>

            	<div className="nav-control" onClick={handleBurger}>
            		<div className={`hamburger ${menuToggle.isActive}`}>
            			<span className="line"></span><span className="line"></span><span className="line"></span>
            		</div>
            	</div>
            </div>
       {/* ******************* Nav header end ****************** */}

       <div className="header">
            	<div className="header-content">
            		<nav className="navbar navbar-expand">
            			<div className="collapse navbar-collapse justify-content-between">
            				<div className="header-left ml-6">
            					<div className="dropdown shortcut-menu mr-4">
            						<button type="button" data-toggle="dropdown" aria-expanded="false" className="btn btn-primary dropdown-toggle">
            							Create as new
            						</button>
            						<div className="dropdown-menu shadow">
            							<Link to="/all-prescription" className="dropdown-item">Prescription</Link>
            							<Link to="/patients" className="dropdown-item">Patient</Link>
            							<Link to="/doctor-appointments" className="dropdown-item">Appointment</Link> 
            							<Link to="/all-drugs" className="dropdown-item">Drug</Link>
            							<Link to="/all-tests" className="dropdown-item">Diagnosis Test</Link>
            						</div>
            					</div>

            					<div className="dashboard_bar">
            						Dashboard
            					</div>
            				</div>

							{ token && token !=='' ? (<ul className="navbar-nav header-right">
            					<li className="nav-item dropdown header-profile">
            						<Link className="nav-link" to="#" role="button" data-toggle="dropdown">
            							<img src={require('../../../images/profile/12.png')} width="20" alt=""/>
            							<div className="header-info">
            								<span>Hello,<strong> {user.name.split(' ')[0]}</strong></span>
            							</div>
            						</Link>
            						<div className="dropdown-menu dropdown-menu-right">
            							<Link to="#" className="dropdown-item ai-icon">
            								<svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            								<span className="ml-2">Profile </span>
            							</Link> 
            							<a href="#"  onClick={logoutHandler}  className="dropdown-item ai-icon">
            								<svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            								<span className="ml-2">Logout </span>
            							</a>
            						</div>
            					</li>
            				</ul>) : '' }
            			</div>
            		</nav>
            	</div>
            </div>
    </>
  )
}

export default Header