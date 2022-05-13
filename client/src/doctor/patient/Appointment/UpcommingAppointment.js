import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DataTable from "react-data-table-component";
import { Paper } from "@material-ui/core";
import { useAlert } from 'react-alert';
import { getPatientUpcommingAppointments} from '../../../Actions/User';
import PatientSideBar from '../Layout/PatientSideBar';
import Loader from '../Layout/Loader';

const UpcommingAppointment = () => {

  const dispatch = useDispatch();
  
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  useEffect(() => {
    dispatch(getPatientUpcommingAppointments());
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
    }
  ];

  return (
    <>
    <Header title={'Upcoming Appointments'}/>
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
                      <h4 className="card-title">Upcoming Appointments</h4>
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
      <Footer/>
    </>
  );
};

export default UpcommingAppointment;
