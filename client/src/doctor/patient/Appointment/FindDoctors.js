import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  getSearchDoctor } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import PatientSideBar from "../Layout/PatientSideBar";

const FindDoctors = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(async()=>{
    await dispatch(getSearchDoctor(null));
  }, [])

  const [searchKey, setSearchKey] = useState('');
  const { searchDoctors } = useSelector((state) => state.searchDoctors);

  const handleSearch = async(e)=>{
    setSearchKey(e.target.value);
    await dispatch(getSearchDoctor(searchKey));
  }
  const showSlots = (doctId) =>{
    history(`/patient/create-appointment/${doctId}`)
  }
  
  return (
    <>
      <Header title={'New Appointment'} />
      <PatientSideBar />
      <div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow mb-4">
                <div className="card-body" data-select2-id="select2-data-6-tqdb">
                
                  <div className="row" data-select2-id="select2-data-5-akdn">

                  <div className="col-md-12 col-sm-12">
                      <div
                        className="form-group">
                        <label for="searchKey">Search Doctor/Department </label>
                        <input type="text" name="searchKey" value={searchKey} onChange={handleSearch} placeholder="Search for department or doctor" className="form-control" autoComplete="off" />
                      </div>
                    </div>

           {/* doctors */}
           {  searchDoctors && searchDoctors.length > 0 ? searchDoctors.map((user)=> (
             <>
              <div className="col-xl-12 col-xxl-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="media d-sm-flex d-block text-center text-sm-left pb-4 border-bottom">
                    <img
                      alt="image"
                      className="rounded mr-sm-4 mr-0"
                      width="130"
                      src={user.profileImage ? user.profileImage.url : require("../../../images/profile/12.png")}
                    />
                    <div className="media-body align-items-center">
                      <div className="d-sm-flex d-block justify-content-between my-3 my-sm-0">
                        <div>
                          <h3 className="fs-22 text-black font-w600 mb-2">
                            Dr. {user.name}
                          </h3>
                          <p className="mb-1"> {user.academic} </p>

                          <p className="mb-1 mb-sm-1">
                            <svg
                              className="mr-1 scale5"
                              width="14"
                              height="14"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M27.75 11.5C27.7538 10.8116 27.568 10.1355 27.213 9.54575C26.8581 8.95597 26.3476 8.47527 25.7376 8.15632C25.1276 7.83737 24.4415 7.69248 23.7547 7.73752C23.0678 7.78257 22.4065 8.01581 21.8434 8.4117C21.2803 8.80758 20.837 9.35083 20.5621 9.98192C20.2872 10.613 20.1913 11.3076 20.2849 11.9896C20.3785 12.6715 20.6581 13.3146 21.0929 13.8482C21.5277 14.3819 22.101 14.7855 22.75 15.015V19C22.75 20.6576 22.0915 22.2473 20.9194 23.4194C19.7473 24.5915 18.1576 25.25 16.5 25.25C14.8424 25.25 13.2527 24.5915 12.0806 23.4194C10.9085 22.2473 10.25 20.6576 10.25 19V17.65C12.3301 17.3482 14.2323 16.3083 15.6092 14.7203C16.9861 13.1322 17.746 11.1019 17.75 9V1.5C17.75 1.16848 17.6183 0.850537 17.3839 0.616116C17.1495 0.381696 16.8315 0.25 16.5 0.25H12.75C12.4185 0.25 12.1005 0.381696 11.8661 0.616116C11.6317 0.850537 11.5 1.16848 11.5 1.5C11.5 1.83152 11.6317 2.14946 11.8661 2.38388C12.1005 2.6183 12.4185 2.75 12.75 2.75H15.25V9C15.25 10.6576 14.5915 12.2473 13.4194 13.4194C12.2473 14.5915 10.6576 15.25 9 15.25C7.34239 15.25 5.75268 14.5915 4.58058 13.4194C3.40848 12.2473 2.75 10.6576 2.75 9V2.75H5.25C5.58152 2.75 5.89946 2.6183 6.13388 2.38388C6.3683 2.14946 6.5 1.83152 6.5 1.5C6.5 1.16848 6.3683 0.850537 6.13388 0.616116C5.89946 0.381696 5.58152 0.25 5.25 0.25H1.5C1.16848 0.25 0.850537 0.381696 0.616116 0.616116C0.381696 0.850537 0.25 1.16848 0.25 1.5V9C0.25402 11.1019 1.01386 13.1322 2.3908 14.7203C3.76773 16.3083 5.6699 17.3482 7.75 17.65V19C7.75 21.3206 8.67187 23.5462 10.3128 25.1872C11.9538 26.8281 14.1794 27.75 16.5 27.75C18.8206 27.75 21.0462 26.8281 22.6872 25.1872C24.3281 23.5462 25.25 21.3206 25.25 19V15.015C25.9792 14.7599 26.6114 14.2848 27.0591 13.6552C27.5069 13.0256 27.7483 12.2726 27.75 11.5Z"
                                fill="#004bad"
                              ></path>
                            </svg>
                            {user.specialist}
                          </p>
                          <p className="mb-2">
                            <i className="fa fa-star text-warning"></i> 4.8 (200
                            Review)
                          </p>
                        </div>
                      
                      </div>
                      <a
                        href="#"
                        className="btn bgl-primary btn-rounded text-black mb-2 mr-2"
                      >
                        {user.patientNo} Patients
                      </a>
                      <a
                        href="#"
                        className="btn bgl-primary btn-rounded mb-2 text-black"
                      >
                        {user.surgery} Surgery
                      </a>
                      <a
                        href="#"
                        className="btn bgl-primary btn-rounded text-black mb-2 mr-2"
                      >
                         {user.experienceYear} year Experience
                      </a>
                    </div>
                  </div>
                </div>
                 <button type="button" onClick={(e)=>{ showSlots(user._id)}} className="btn btn-primary">Make An Appointment</button>
              </div>
            </div>
            </>
            )) : (<div className="col-xl-12 col-xxl-12 col-lg-12">
              <div className="card"> Not Found </div></div>)}
          </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindDoctors;
