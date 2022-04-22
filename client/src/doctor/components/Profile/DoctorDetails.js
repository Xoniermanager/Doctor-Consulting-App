import React from "react";
import { Link } from "react-router-dom";
import Experience from "./Experience";

const DoctorDetails = ({ user }) => {
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
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
                            </svg>{" "}
                            {user.specialist}{" "}
                          </p>
                          <p className="mb-1">{user.about}</p>
                          <p className="mb-2">
                            <i className="fa fa-star text-warning"></i> 4.8 (200
                            Review){" "}
                          </p>
                        </div>
                        <Link
                          to="#"
                          data-toggle="modal"
                          data-target="#basicModal"
                        >
                          <span className="fa fa-edit"></span>
                        </Link>
                      </div>
                      <Link
                        to="#"
                        className="btn bgl-primary btn-rounded text-black mb-2 mr-2"
                      >
                        500 Patients
                      </Link>
                      <Link
                        to="#"
                        className="btn bgl-primary btn-rounded mb-2 text-black"
                      >
                        50 Surgery
                      </Link>
                      <Link
                        to="#"
                        className="btn bgl-primary btn-rounded text-black mb-2 mr-2"
                      >
                        10 year Experience
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-xxl-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="fs-20 font-w600 mb-0">Experience:</h4>
                  <Link to="#" data-toggle="modal" data-target="#Experience">
                    <span className="fa fa-edit"></span>
                  </Link>
                </div>
                <div className="card-body pt-4">
                  <div
                    id="DZ_W_Todo2"
                    className="widget-media dz-scroll ps ps--active-y"
                  >
                    <ul className="timeline">
                    {user.experiences && user.experiences.map((item, index)=>(
                        <Experience key={index} items={{experience :item.experience, expYear :item.expYear  }}/>
                    ))}
                    </ul>
                    <div
                      className="ps__rail-x"
                      style={{ left: "0px", bottom: "0px" }}
                    >
                      <div
                        className="ps__thumb-x"
                        tabIndex="0"
                        style={{ left: "0px", width: "0px" }}
                      ></div>
                    </div>
                    <div
                      className="ps__rail-y"
                      style={{ top: "0px", height: "370px", right: "0px" }}
                    >
                      <div
                        className="ps__thumb-y"
                        tabIndex="0"
                        style={{ top: "0px", height: "139px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body">
                  <div className="profile-lang  mb-3">
                    <h4 className="text-primary mb-4">
                      Language
                      <Link
                        to="#"
                        data-toggle="modal"
                        data-target="#Language"
                        className="float-right"
                      >
                        <span className="fa fa-edit"></span>
                      </Link>
                    </h4>
                   {user.languages && user.languages.map((item, index)=>(
                    <Link key={index} to="#" className="btn btn-primary light btn-xs mb-1">
                      <i className="flag-icon flag-icon-us"></i> {item.value}
                    </Link>
                   ))}
                  </div>
                  <div className="profile-news">
                    <h5 className="text-primary d-inline"> Profile Video:</h5>
                    <div className="pt-3 pb-3">
                      <iframe
                        width="100%"
                        height="250"
                        src={user.videoIntroUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="profile-tab">
                    <div className="custom-tab-1">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a
                            href="#my-posts"
                            data-toggle="tab"
                            className="nav-link active show"
                          >
                            Academic Details:
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#about-me"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            Awards :
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#profile-settings"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            Clinic Details:
                          </a>
                        </li>

                        <Link
                          to="#"
                          data-toggle="modal"
                          data-target="#Academic"
                          className="float-right"
                        >
                          <span className="fa fa-edit"></span>
                        </Link>
                      </ul>
                      <div className="tab-content">
                        <div
                          id="my-posts"
                          className="tab-pane fade active show"
                        >
                          <div className="my-post-content pt-4">
                          {user.academic_details && user.academic_details.map((item)=>(
                            <div key={item._id} className="profile-uoloaded-post pb-2 mb-3 border-bottom">
                              <h4>
                               {item.academic}
                              </h4>
                            </div>
                          ))}
                          </div>
                        </div>
                        <div id="about-me" className="tab-pane fade">
                          <div className="profile-personal-info mt-4">
                            <h4 className="text-primary mb-4">Awards</h4>
                            {user.awards && user.awards.map((item)=>(
                            <div key={item._id} className="row mb-2">
                              <div className="col-2">
                                <img
                                  src={ item.awardImage ? item.awardImage.url : require("../../../images/profile/award.jpg")}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="col-10">
                                <span>{item.awardName}</span>
                              </div>
                            </div>
                            ))}
                          </div>
                        </div>
                        <div id="profile-settings" className="tab-pane fade">
                          <div className="pt-4">
                            <div className="settings-form">
                              <h4 className="text-primary">Clinic Details:</h4>
                              <div className="row mt-3">
                                <div className="col-12">
                                  <span>{user.clinic_details} </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
