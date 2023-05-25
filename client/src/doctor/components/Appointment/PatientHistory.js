import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  doctorDetailById,
  getAllPrescriptionDetails,
} from "../../../Actions/User";
import Header from "../Layout/Header";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Moment from "moment";
import { Link, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
const PatientHistory = () => {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getPatient());
    dispatch(doctorDetailById(patientId));
    dispatch(getAllPrescriptionDetails(patientId));
  }, [dispatch]);

  let { loading, doctorDetails } = useSelector((state) => state.doctorDetails);

  const { allPrescriptions } = useSelector((state) => state.allPrescriptions);

  const { user } = useSelector((state) => state.user);

  const diffInMs = Math.abs(
    new Date() - new Date(doctorDetails && doctorDetails.birthday)
  );
  const age = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 365));

  console.log("users", user);
  console.log("patients", doctorDetails);
  console.log("prescription", allPrescriptions);

  return (
    <>
      <Header title={"Patients History"} />
      <DoctSideBar />
      {loading === true ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-block">
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="card-title">Patient History</h4>
                      </div>
                      <div className="col-md-6 text-right">
                        <Link to="/patients" className="btn btn-primary btn-sm">
                          All Patient
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <p className="mb-0">
                          <b>Dr. {user.name}</b>
                        </p>
                        <p>{user.academic}</p>
                      </div>
                      <div className="col-lg-3"></div>
                      <div className="col-lg-3">
                        <p>
                          {user.clinic_details}, On{" "}
                          {Moment(new Date()).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <hr />
                        <p>
                          <b>Patient Name :</b>{" "}
                          {doctorDetails && doctorDetails.name} - <b>Age :</b>
                          {`${
                            doctorDetails && doctorDetails.birthday
                          } (${age} Years)`}{" "}
                          -<b>Gender :</b>{" "}
                          {doctorDetails && doctorDetails.gender} -
                          <b>Patient Weight :</b>{" "}
                          {doctorDetails && doctorDetails.weight} Kg -{" "}
                          <b>Patient Height :</b>{" "}
                          {doctorDetails && doctorDetails.height} cm
                        </p>
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        {allPrescriptions &&
                          allPrescriptions.prescription.map(
                            (precscriptions) => (
                              <div className="card-body bg-gray">
                                <h6>
                                  <b>Summary</b> :{" "}
                                  {precscriptions.diagnosticSummary}
                                  <span className="float-right">
                                    Date:{" "}
                                    {Moment(precscriptions.createdAt).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </span>
                                </h6>
                                <h6 className="bb-u">
                                  <b>Drugs</b>
                                </h6>
                                <ul class="prescription-list">
                                  {precscriptions.drugs &&
                                    precscriptions.drugs.map((drug) => (
                                      <li>
                                        <b>{drug.drugId.drugName}:</b>
                                        <span class="ml-4">
                                          {drug.drugDuration} / {drug.drugDose}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                                <h6 className="bb-u">
                                  <b>Tests</b>
                                </h6>
                                <ul class="prescription-list">
                                     {/* {console.log(precscriptions.tests)} */}
                                  {precscriptions.tests &&
                                    precscriptions.tests.map((test) => (
                                      <li>
                                        <b>{test.testId && test.testId.testName}{" "}</b>
                                        {test.report && test.report.url ? (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              window.open(
                                                test.report.url,
                                                "_blank"
                                              )
                                            }
                                            className="btn btn-primary shadow btn-xs text-center"
                                          >
                                            <i className="fa fa-file"></i>
                                          </button>
                                        ) : (
                                          ""
                                        )}
                                        <span className="ml-4">
                                          {test.testDescription}{" "}
                                        </span> 
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default PatientHistory;
