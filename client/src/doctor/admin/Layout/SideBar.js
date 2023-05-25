import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
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
        <div className="">
          <ul className="metismenu" id="menu">
            <li>
              <Link className="ai-icon" to="/admin">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                className="ai-icon"
                to="/admin/doctors"
                aria-expanded="false"
              >
                <i className="flaticon-381-internet"></i>
                <span className="nav-text">All Doctors</span>
              </Link>
            </li>

            <li>
              <Link
                className="ai-icon"
                to="/admin/patients"
                aria-expanded="false"
              >
                <i className="flaticon-381-internet"></i>
                <span className="nav-text">All Patients</span>
              </Link>
            </li>

            {/* <li>
              <Link className="ai-icon" to="/admin/prescriptions" aria-expanded="false">
                <i className="flaticon-381-heart"></i>
                <span className="nav-text">All Prescriptions</span>
              </Link>
            </li> */}

            <li
              key={1}
              data-index={1}
              onClick={handlerMenu}
              className={getIndex == 1 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 1 ? true : false}
              >
                <i className="flaticon-381-settings-2"></i>
                <span className="nav-text">Drugs</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 1 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-drug">New Drug</Link>
                </li>
                <li>
                  <Link to="/admin/all-drugs">All Drugs</Link>
                </li>
              </ul>
            </li>

            <li
              key={2}
              data-index={2}
              onClick={handlerMenu}
              className={getIndex == 2 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 2 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Diagnosis Tests</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 2 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-test">New Diagnosis Tests</Link>
                </li>
                <li>
                  <Link to="/admin/all-tests">All Diagnosis Tests</Link>
                </li>
              </ul>
            </li>

            <li
              key={3}
              data-index={3}
              onClick={handlerMenu}
              className={getIndex == 3 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 3 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Disease</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 3 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-disease">New Disease</Link>
                </li>
                <li>
                  <Link to="/admin/all-diseases">All Diseases</Link>
                </li>
              </ul>
            </li>

            <li
              key={4}
              data-index={4}
              onClick={handlerMenu}
              className={getIndex == 4 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 4 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Department</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 4 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-department">New Department</Link>
                </li>
                <li>
                  <Link to="/admin/all-departments">All Departments</Link>
                </li>
              </ul>
            </li>

            <li
              key={5}
              data-index={5}
              onClick={handlerMenu}
              className={getIndex == 5 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 5 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Faq</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 5 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-faq">New Faq</Link>
                </li>
                <li>
                  <Link to="/admin/all-faqs">Faqs</Link>
                </li>
              </ul>
            </li>

            <li
              key={6}
              data-index={6}
              onClick={handlerMenu}
              className={getIndex == 6 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 6 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">News</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 6 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-news">Add News</Link>
                </li>
                <li>
                  <Link to="/admin/all-newses">Newses</Link>
                </li>
              </ul>
            </li>

            <li
              key={7}
              data-index={7}
              onClick={handlerMenu}
              className={getIndex == 7 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 7 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Services</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 7 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-service">Add Services</Link>
                </li>
                <li>
                  <Link to="/admin/all-service">Services</Link>
                </li>
              </ul>
            </li>

            <li
              key={8}
              data-index={8}
              onClick={handlerMenu}
              className={getIndex == 8 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 8 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Stories</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 8 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-stories">Add Stories</Link>
                </li>
                <li>
                  <Link to="/admin/all-stories">Stories</Link>
                </li>
              </ul>
            </li>
            <li
              key={9}
              data-index={9}
              onClick={handlerMenu}
              className={getIndex == 9 ? "mm-active" : ""}
            >
              <a
                className="has-arrow ai-icon"
                href="#"
                aria-expanded={getIndex == 9 ? true : false}
              >
                <i className="flaticon-381-notepad"></i>
                <span className="nav-text">Our Client</span>
              </a>
              <ul
                aria-expanded="false"
                className={`mm-collapse  ${getIndex == 9 ? "mm-show" : ""}`}
              >
                <li>
                  <Link to="/admin/create-client">Add Client</Link>
                </li>
                <li>
                  <Link to="/admin/all-client">Client</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                className="ai-icon"
                to="/admin/about"
                aria-expanded="false"
              >
                <i className="flaticon-381-internet"></i>
                <span className="nav-text">About</span>
              </Link>
            </li>
            <li>
              <Link
                className="ai-icon"
                to="/admin/our-approach"
                aria-expanded="false"
              >
                <i className="flaticon-381-internet"></i>
                <span className="nav-text">Our Approach</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
