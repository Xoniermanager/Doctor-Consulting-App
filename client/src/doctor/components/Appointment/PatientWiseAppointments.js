import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";

import { Link, useParams } from "react-router-dom";
import { getPatientAppointments } from '../../../Actions/User';
import Loader from '../Layout/Loader';
import DoctSideBar from '../Layout/DoctSideBar';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
const PatientWiseAppointments = () => {

  const { patientId } = useParams();
  const dispatch = useDispatch();
  let { loading, patientAppointments } = useSelector((state) => state.patientAppointments);
  useEffect(async() => {
    if(patientId) 
    await dispatch(getPatientAppointments(patientId));

    if(patientAppointments === undefined){
      await dispatch(getPatientAppointments(patientId));
    }
  }, [dispatch, patientId]);

  console.log(patientAppointments, patientId);

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

  const columns = [
    {
      name: "S.No.",
      selector: "sno"
    },
    {
      name: "PATIENT NAME",
      selector: "patientName",
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
      { row.isPrescription ? (<> <Link to={`/view-prescription/${row.prescriptionId}`} className="btn btn-success shadow btn-sm sharp mr-1"><i className="fa fa-eye"></i></Link> </>) : (<button className='btn btn-danger'>No</button>)}
      </div>,
      name: "Prescription",
    }
  ];


  return (
    <>
    <Header title={'Patient Appointments'}/>
    <DoctSideBar/>
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
                    />
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      <Footer/>
    </>
  );
};

export default PatientWiseAppointments;
