import React, { useState } from "react";
import { Link } from "react-router-dom";

const PatientSideBar = () => {
  const [getIndex, setIndex] = useState(0);
  const handlerMenu = (event) => {
    if (getIndex == event.currentTarget.dataset.index) {
      setIndex(0);
    } else {
      setIndex(event.currentTarget.dataset.index);
    }
  };

  return (
    <>
      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link className="ai-icon" to="/patient">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className="ai-icon"
                to="/patient/profile"
                aria-expanded="false"
              >
                <i className="flaticon-381-television"></i>
                <span className="nav-text">Profile</span>
              </Link>
            </li>

            <li key={1} data-index={1} onClick={handlerMenu} className={ getIndex==1 ? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex == 1 ? true : false}
              >
                <i className="flaticon-381-calendar"></i>
                <span className="nav-text">Appointment</span>
              </a>
              
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 1 ? 'mm-show' : ''}`}>
                {/* <li>
                  <Link to="/patient/doctor-list">Book Appointment</Link>
                </li> */}
                <li>
                  <Link to="/patient/create-appointment/626cd04a857ce8a353529632">Book Appointment</Link>
                </li>
                <li>
                  <Link to="/patient/upcomming-appointment">Upcomming</Link>
                </li>
                <li>
                  <Link to="/patient/completed-appointment">Completed</Link>
                </li>
                {/* <li>
                  <Link to="/patient/followup-appointment">Followup</Link>
                </li> */}
                <li>
                  <Link to="/patient/appointments">All Appointments</Link>
                </li>
              </ul>
            </li>
            
            <li>
              <Link className="ai-icon" to="/patient/reports" aria-expanded="false">
                <i className="flaticon-381-internet"></i>
                <span className="nav-text">Reports</span>
              </Link>
            </li>
            <li>
              <Link
                className="ai-icon"
                to="/patient/change-password"
                aria-expanded="false"
              >
                <i className="flaticon-381-key"></i>
                <span className="nav-text">Change Password</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PatientSideBar;
