import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPatientPrescriptionDetails } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import PatientSideBar from "../Layout/PatientSideBar";
import Loader from "../Layout/Loader";

const ViewPatientPrescription = () => {

  const { presId } = useParams();
  const dispatch = useDispatch();

  let { loading, editData } = useSelector((state) => state.editData);

  useEffect(async() => {
   if(presId)
   await dispatch(getPatientPrescriptionDetails(presId));
   if(editData === undefined){
    await dispatch(getPatientPrescriptionDetails(presId));
   }
  }, [dispatch, presId]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let { user } = useSelector((state) => state.user);

   const diffInMs = Math.abs(new Date() - new Date(user.birthday));
   const age = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 365));

  return (
    <>
     <Header title={'Prescription Details'}/>
      <PatientSideBar />
      {loading === true ? <Loader /> : (<div  className="content-body">
        <div className="container-fluid">
        <div ref={componentRef} className="row">
            <div className="col-lg-12 text-right">
            <button className="text-right btn btn-md btn-info" onClick={handlePrint}>Print!</button>
            </div>
        </div>
          {/* <!-- row --> */}
          <div ref={componentRef} className="row">
            <div className="col-lg-12">
              <div className="card shadow mb-4">
              { editData ? (
                 <div className="card-body">
                  <div className="row">
                    <div className="col">Dr. {editData.doctorDetail[0].name}</div>
                    <div className="col-md-3">
                      <p>{editData.doctorDetail[0].clinic_details}, On {Moment(editData.doctorDetail[0].createdAt).format('DD-MM-YYYY')}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <hr />
                      <p>
                        <b>Patient Name :</b> {user.name} - <b>Age :</b>
                        { `${user.birthday} (${age} Years)`} -<b>Gender :</b> {user.gender} - 
                        <b>Patient Weight :</b> {user.weight} Kg - <b>Patient Height :</b>{" "}
                        {user.height} cm
                      </p>
                      <hr />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col">
                    <h3> Drugs</h3>
                    {editData.drugs && editData.drugs.map(drug=>(
                      <p>
                        {drug.drugId.drugName}
                        <span className="float-right">{drug.drugDuration} days</span>
                      </p>
                    ))}
                    
                    <h3> Tests </h3>
                    {editData.tests && editData.tests.map(test=>(
                      <p>
                        {test.testId.testName}
                        {test.report && test.report.url ? (<button type="button" onClick={()=> window.open(test.report.url, "_blank")} className='btn btn-primary shadow btn-xs text-center'><i className="fa fa-file"></i></button>) : ''} 
                        <span className="float-right">{test.testDescription} </span>
                      </p>
                    ))}

                    </div>
                  </div>
                </div>) : '' } 
              </div>
            </div>
          </div>
        </div>
      </div>)}
      <Footer/>
    </>
  );
};

export default ViewPatientPrescription;
