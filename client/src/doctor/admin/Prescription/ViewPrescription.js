import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPrescription } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import SideBar from "../Layout/SideBar";

const ViewPrescription = () => {

  const { presId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(editPrescription(presId));
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  let { editData } = useSelector((state) => state.editData);
   const diffInMs = Math.abs(new Date() - new Date(editData.patientDetail[0].birthday));
    const age = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 365));

  return (
    <>
     <Header />
      <SideBar />
      
      <div  className="content-body">
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
                        <b>Patient Name :</b> {editData.patientDetail[0].name} - <b>Age :</b>
                        { `${editData.patientDetail[0].birthday} (${age} Years)`} -<b>Gender :</b> {editData.patientDetail[0].gender} - 
                        <b>Patient Weight :</b> {editData.patientDetail[0].weight} Kg - <b>Patient Height :</b>{" "}
                        {editData.patientDetail[0].height} cm
                      </p>
                      <hr />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col">
                    {editData.drugs && editData.drugs.map(drug=>(
                      <p>
                        {drug.drugId.drugName}
                        <span className="float-right">{drug.drugDuration} days</span>
                      </p>
                    ))}
                      
                    </div>
                  </div>
                </div>) : '' } 
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ViewPrescription;
