import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPrescription } from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";


const ViewPrescription = () => {
  const { presId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(editPrescription(presId));
  }, []);

  let { editData } = useSelector((state) => state.editData);
  console.log(editData);

    const diffInMs = Math.abs(new Date() - new Date(editData.patientDetail[0].birthday));
    const age = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 365));

  return (
    <>
     <Header />
      <DoctSideBar />
      <div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow mb-4">
                 <div className="card-body">
                  <div className="row">
                    <div className="col">Dr. {editData.doctorDetail[0].name}</div>
                    <div className="col-md-3">
                      <p>{editData.doctorDetail[0].clinic_details}, On 15-03-2022</p>
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
                </div> 
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
