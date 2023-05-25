import React, { useState,useEffect } from 'react'
import './Style.css';
import logo from '../../../images/doc_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { toggleMenus } from '../../../Actions/User';

const Header = ({title}) => {

	const token = localStorage.getItem('token');
	const [mebOpen, setMebOpen] = useState(false);
	const {menuToggle} = useSelector((state)=>state.menuToggle);

	const toggleData = {
        isActive : '',
        isToggle : ''
    }
	const toogle  = menuToggle ? menuToggle:toggleData;
	
	const dispatch = useDispatch();

	const {user} = useSelector((state)=>state.user);
	const history = useNavigate();
	const alert = useAlert();

	const logoutHandler = () => {
		localStorage.setItem('token','');
		alert.success("Logged out successfully");
		window.location.href = '/login';
	 };

	const handleBurger = () =>{
		setMebOpen(!mebOpen);
		dispatch(toggleMenus(mebOpen));
	}
	//console.log(menuToggle);

  return (
    <>
     {/* ******************* Nav header start ****************** */}
            <div className="nav-header">
            	<Link to="/doctor" className="brand-logo">
            		<img className="logo-abbr" src={logo} alt="Logo"/>
            	</Link>

            	<div className="nav-control" onClick={handleBurger}>
            		<div className={`hamburger ${toogle.isActive}`}>
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
            							<Link to="/patient/create" className="dropdown-item">Add Patient</Link>
            							{/* <Link to="/create-appointment" className="dropdown-item">Create Appointment</Link>  */}
            							<Link to="/create-slot" className="dropdown-item">Create Time Slot</Link>
            							<Link to="/create-test" className="dropdown-item">Add Diagnosis Test</Link>
										<Link to="/create-drug" className="dropdown-item">Add Drug</Link>
            						</div>
            					</div>

            					<div className="dashboard_bar">
            						{title}
            					</div>
            				</div>

							{ token && token !=='' ? (<ul className="navbar-nav header-right">
            					<li className="nav-item dropdown header-profile">
            						<Link className="nav-link" to="#" role="button" data-toggle="dropdown">
            							<img  src={user && user.profileImage ? user.profileImage.url : require("../../../images/profile/12.png")} width="20" alt=""/>
            							<div className="header-info">
            								<span>Hello,<strong> {user && user.name.split(' ')[0]}</strong></span>
            							</div>
            						</Link>
            						<div className="dropdown-menu dropdown-menu-right">
            							<Link to="/doctor/profile" className="dropdown-item ai-icon">
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