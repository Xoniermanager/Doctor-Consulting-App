import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DataTable from "react-data-table-component";
import { Paper } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { getPatientCompletedAppointments} from '../../../Actions/User';
import PatientSideBar from '../Layout/PatientSideBar';
import Loader from '../Layout/Loader';

const CompletedAppointment = () => {

  const dispatch = useDispatch();
  
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  useEffect(() => {
    dispatch(getPatientCompletedAppointments());
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
      name: "DATE",
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
      { row.isPrescription ? (<> <Link to={`/patient/view-prescription/${row.prescriptionId}`} className="btn btn-success shadow btn-sm sharp mr-1"><i className="fa fa-eye"></i></Link></>) : (<button className='btn btn-danger'>No</button>)}
      </div>,
      name: "Prescription",
    }
  ];


  return (
    <>
    <Header title={'Completed Appointments'}/>
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
                      <h4 className="card-title">Completed Appointments</h4>
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

export default CompletedAppointment;
