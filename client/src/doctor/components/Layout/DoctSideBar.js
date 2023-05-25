import React, { useState } from "react";
import { Link } from "react-router-dom";

const DoctSideBar = () => {
  const [getIndex, setIndex] = useState(0);
  const handlerMenu = (event) => {
    if(getIndex == event.currentTarget.dataset.index){
      setIndex(0);
    }else{
       setIndex(event.currentTarget.dataset.index);
    }
 };

  return (
    <>
      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link className="ai-icon" to="/doctor">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link className="ai-icon" to="/doctor/profile" aria-expanded="false">
                <i className="flaticon-381-television"></i>
                <span className="nav-text">Profile</span>
              </Link>
            </li>

            <li>
              <Link className="ai-icon" to="/doctor/all-payment" aria-expanded="false">
                <i className="fa fa-money"></i>
                <span className="nav-text">All Transaction</span>
              </Link>
            </li>

            {/* <li key={1} data-index={1} onClick={handlerMenu} className={ getIndex ==1 ? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex ==1 ? true : false}
              >
                <i className="flaticon-381-heart"></i>
                <span className="nav-text">Prescriptions</span>
              </a>
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 1 ? 'mm-show' : ''}`}>
                <li>
                  <Link to="/create-prescription">New Prescription</Link>
                </li>
                <li>
                  <Link to="/all-prescription">All Prescriptions</Link>
                </li>
              </ul>
            </li> */}

            <li key={2} data-index={2} onClick={handlerMenu} className={ getIndex==2 ? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex==2 ? true : false}
              >
                <i className="flaticon-381-internet"></i>
                <span className="nav-text">Patient</span>
              </a>
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 2 ? 'mm-show' : ''}`}>
                <li>
                  <Link to="/patient/create">New Patient</Link>
                </li>
                <li>
                  <Link to="/patients">All Patient</Link>
                </li>
              </ul>
            </li>
            
            <li key={3} data-index={3} onClick={handlerMenu} className={ getIndex==3 ? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex == 3 ? true : false}
              >
                <i className="flaticon-381-settings-2"></i>
                <span className="nav-text">Drugs</span>
              </a>
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 3 ? 'mm-show' : ''}`}>
                <li>
                  <Link to="/create-drug">New Drug</Link>
                </li>
                <li>
                  <Link to="/all-drugs">All Drugs</Link>
                </li>
              </ul>
            </li>

            <li key={4} data-index={4} onClick={handlerMenu} className={ getIndex==4 ? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex == 4 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Diagnosis Tests</span>
              </a>
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 4 ? 'mm-show' : ''}`}>
                <li>
                  <Link to="/create-test">New Diagnosis Tests</Link>
                </li>
                <li>
                  <Link to="/all-tests">All Diagnosis Tests</Link>
                </li>
              </ul>
            </li>
            
            <li key={5} data-index={5} onClick={handlerMenu} className={ getIndex==5 ? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex == 5 ? true : false}
              >
                <i className="flaticon-381-calendar"></i>
                <span className="nav-text">Appointment</span>
              </a>
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 5 ? 'mm-show' : ''}`}>
                {/* <li>
                  <Link to="/create-appointment">New Appointment</Link>
                </li> */}
                <li>
                  <Link to="/doctor-appointments">All Appointments</Link>
                </li>
              </ul>
            </li>
            <li key={6} data-index={6} onClick={handlerMenu} className={ getIndex==6? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex == 6 ? true : false}
              >
                <i className="flaticon-381-clock"></i>
                <span className="nav-text">Appointment Slot</span>
              </a>
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 6 ? 'mm-show' : ''}`}>
                <li>
                  <Link to="/create-slot">New Slot</Link>
                </li>
                <li>
                  <Link to="/my-slots">Slots List</Link>
                </li>
                <li>
                  <Link to="/date-slot">My Slot</Link>
                </li>
              </ul>
            </li>
            <li key={7} data-index={7} onClick={handlerMenu} className={ getIndex==7 ? 'mm-active' : ''}>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={ getIndex == 7 ? true : false}
              >
                <i className="flaticon-381-settings-1"></i>
                <span className="nav-text">Setting</span>
              </a>
              <ul aria-expanded="false" className={`mm-collapse  ${getIndex == 7 ? 'mm-show' : ''}`}>
                <li>
                  <Link to="/appointment-fee">Appointment Fee</Link>
                </li>
                <li>
                  <Link to="/email-template">Email Template</Link>
                </li>
                <li>
                  <Link to="/payment-credential">Payment Credential</Link>
                </li>
              </ul>
            </li>
          
           
     
            {/* <li>
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded="false"
              >
                <i className="flaticon-381-network"></i>
                <span className="nav-text">Billing</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <Link to="create-invoice.html">New Billing </Link>
                </li>
                <li>
                  <Link to="all-invoice.html">All Billings</Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DoctSideBar;
