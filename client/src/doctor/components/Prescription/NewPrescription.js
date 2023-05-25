import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPrescription,
  editPrescription,
  getAppointmentDetailsById,
  getDrug,
  getPatient,
  getTests,
  updatePrescription,
} from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

import AddMoreDrug from "./AddMoreDrug";
import AddMoreTest from "./AddMoreTest";
import Loader from "../Layout/Loader";
import Moment from "moment";

const NewPrescription = () => {
  let dt = Moment(new Date()).format("YYYY-MM-DD");

  const history = useNavigate();
  const { appId, presId } = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();
  let { error, message } = useSelector((state) => state.apiStatus);
  let { loading, editData } = useSelector((state) => state.editData);

  useEffect(() => {
    dispatch(getDrug());
    dispatch(getTests());
    if (presId !== undefined && presId) {
      dispatch(editPrescription(presId));
    }

    if (appId !== undefined && appId) {
      dispatch(getAppointmentDetailsById(appId));
    }

    if (editData === undefined) {
      dispatch(editPrescription(presId));
    }

    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, error, message, presId, appId]);

  let { drugs } = useSelector((state) => state.drugs);
  let { tests } = useSelector((state) => state.tests);

  console.log("edit_data", editData);

  const [selectPatient, setSelectPatient] = useState(
    editData
      ? editData
      : { patientId: "", diagnosticSummary: "", nextAppointment: "" }
  );

  console.log("select", selectPatient);

  const handleOnChange = (e) => {
    setSelectPatient({ ...selectPatient, [e.target.name]: e.target.value });
  };

  const [drugValue, setDrugValue] = useState(
    editData && editData.drugs
      ? editData.drugs
      : [
          {
            drugType: "",
            drugId: "",
            drugStrength: "",
            drugDose: "",
            drugDuration: "",
            drugAdvice: "",
          },
        ]
  );

  const [testValue, setTestValue] = useState(
    editData && editData.tests
      ? editData.tests
      : [{ testId: "", testDescription: "" }]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    //setSelectPatient(editData);

    if (presId !== undefined) {
      await dispatch(
        updatePrescription(presId, selectPatient, drugValue, testValue)
      );
    } else {
      selectPatient.appointmentId = appId;
      selectPatient.doctorId = editData && editData.doctorId;
      selectPatient.patientId = editData && editData.patientId;
      selectPatient.patientName = editData && editData.patientName;
      selectPatient.appointmentDates = editData && editData.createdAt;

      await dispatch(createPrescription(selectPatient, drugValue, testValue));
    }
    if (!error) {
      history("/all-prescription");
    }
  };
  return (
    <>
      <Header title={"Create Prescription"} />
      <DoctSideBar />
      {loading === true ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container-fluid">
            {/* <!-- row --> */}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8 profile-lang">
                          <h4 className="text-primary mb-2">
                            Patient informations
                          </h4>

                          <div className="form-row">
                            <div className="form-group col-md-12 m-0">
                              <div className="form-group m-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="patientName"
                                  value={editData && editData.patientName}
                                />
                                <input
                                  type="hidden"
                                  value={editData && editData.patientId}
                                  name="patientId"
                                />
                                <input
                                  type="hidden"
                                  value={editData && editData._id}
                                  name="appointmentId"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 profile-lang mb-3">
                          <h4 className="text-primary mb-4"> </h4>
                          <button className="btn btn-primary btn-block">
                            Create Prescription
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h4 className="text-primary mb-4">Diagnostic summary </h4>
                      <div className="form-group-custom">
                        <textarea
                          type="text"
                          rows="4"
                          name="diagnosticSummary"
                          value={selectPatient.diagnosticSummary}
                          onChange={handleOnChange}
                          className="form-control"
                          placeholder="Diagnostic summary"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="text-primary mb-4">Drugs list </h4>
                      <fieldset className="drugs_labels">
                        <div className="repeatable">
                          <AddMoreDrug
                            drugValue={drugValue}
                            setDrugValue={setDrugValue}
                            drugs={drugs}
                          />
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="text-primary">Diagnosis Tests list </h4>
                      <fieldset className="test_labels">
                        <div className="repeatable">
                          <AddMoreTest
                            testValue={testValue}
                            setTestValue={setTestValue}
                            tests={tests}
                          />
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h4 className="text-primary mb-4">Next Appointment</h4>
                        <div className="form-group-custom">
                          <input
                            type="date"
                            name="nextAppointment"
                            onChange={handleOnChange}
                            min={dt}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default NewPrescription;
