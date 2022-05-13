import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import {  getPatientAppointments, getPatientPrescriptionDetails, submitTestReport,  } from '../../../Actions/User';
import PatientSideBar from '../Layout/PatientSideBar';
import Loader from '../Layout/Loader';

const PatientAppointments = () => {

  const dispatch = useDispatch();
  
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  let { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getPatientAppointments(user._id));
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  let { loading, patientAppointments } = useSelector((state) => state.patientAppointments);

  let allDoctorAppointments = patientAppointments && patientAppointments.map((element, index)=>{
    let cdate = Moment(element.createdAt).format('DD-MM-YYYY');
    let appDate = Moment(element.appointmentDate).format('DD-MM-YYYY');
    let doctorName = element.doctors[0].name
    element = {
      ...element,
      sno : index +1,
      cdate : cdate,
      appDate : appDate,
      doctorName
    }
    return element;
  })


  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }

  const columns = [
    {
      name: "S.No.",
      selector: "sno"
    },
    {
      name: "DOCTOR NAME",
      selector: "doctorName",
      sortable: true,
    },
    {
      name: "APPOINTMENT DATE",
      selector: "appDate",
      sortable: true,
    },
    {
        name: "SLOT TIME",
        selector: "appointmentTime",
        sortable: true,
    },
    {
      name: "CREATED DATE",
      selector: "cdate"
    },
    {
      cell:(row) => <div className="d-flex">
      { row.isPrescription ? (<> <Link to={`/patient/view-prescription/${row.prescriptionId}`} className="btn btn-success shadow btn-sm sharp mr-1"><i className="fa fa-eye"></i></Link> <button id={row.prescriptionId} onClick={handleOpenModal} className="btn btn-primary shadow btn-sm sharp mr-1"><i className="fa fa-file"></i></button></>) : (<button className='btn btn-danger'>No</button>)}
      </div>,
      name: "Prescription",
    }
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

 

  const [modalShow, setModalShow] = useState('none');

  let { editData } = useSelector((state) => state.editData);

  let [testData, setTestData] = useState([]);
  const modalOpenRef = useRef(null);
    const handleOpenModal = (e) => {
      let id = e.target.id;
      if(id){
      setModalShow('block');
      dispatch(getPatientPrescriptionDetails(id));
      modalOpenRef.current.click();
      }
  }

  const modalRef = useRef(null);
  const handleModalClick = () => {
    modalRef.current.click();
  }

  

  const handleChange = async(evnt) => {
    const { id } = evnt.target;
    const list = [...testData];
      const file = evnt.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload = () => {
        if (Reader.readyState == 2) {
          testData[id]['report'] = Reader.result;
          testData[id]['indexId'] = id;
          dispatch(submitTestReport(testData[id]));
        }
      };
  //  setTestData(list);
   // await dispatch(submitTestReport(testData[id]));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
   // await dispatch(submitTestReport(testData));
    handleModalClick();
  }

  return (
    <>
    <Header title={'Appointments'}/>
    <PatientSideBar/>
    { loading === true ? <Loader /> :(<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-block">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">All Appointments</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Paper>
                    <DataTable
                      columns={columns}
                      data={allDoctorAppointments}
                      pagination
                      // selectableRows
                      // selectableRowsComponent={Checkbox}
                      // selectableRowsComponentProps={
                      //   selectableRowsComponentProps
                      // }
                    />
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}

      <a href="#" ref={modalOpenRef} data-toggle="modal" data-target="#exampleModal"></a> 

      <div className="modal fade" id="exampleModal" style={{display : modalShow}}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload Reports</h5>
              <button type="button" ref={modalRef} className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit} autoComplete='off'>
                {modalShow === 'block' && editData && editData.tests && editData.tests.forEach((test,index)=>{
                  testData[index] = {doctorName : editData.doctorDetail[0].name, reportDate :new Date(), diagnosis : test.testId.testName, patientId :editData.patientId, testId : test.testId._id, testDescription : test.testDescription, presTestId : test._id, report : '', prescriptionId : editData._id, docs : {public_id : test.report && test.report.public_id ? test.report.public_id : '', url :  test.report && test.report.url ? test.report.url : ''} }
                })}
            
                {modalShow === 'block' && editData && editData.tests.map((test, index)=> (
                  <div key={index} className="form-row">
                    <div className="form-group col-md-4">
                      <label>{test.testId.testName}</label>
                    </div>
                    <div className="form-group col-md-5">
                      {test.report && test.report.url ? (<button type="button" onClick={()=> window.open(test.report.url, "_blank")} className='btn btn-primary shadow btn-xs'><i className="fa fa-file"></i></button>) : ''}  
                    </div>
                    <div className="form-group col-md-3">
                      <input
                        type="file"
                        id={index}
                        onChange={(evnt) => handleChange(evnt)}
                        className="form-control"
                        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                      />
                    </div>
                   </div>
                  ))}
                  {modalShow === 'block' && editData && editData.tests.length > 0 ? '' :  <div className="form-row">
                    <div className="form-group col-md-12 text-center"> No test available in this appointment </div> </div> }
                  <button type="submit" className="btn btn-danger float-right">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PatientAppointments;
