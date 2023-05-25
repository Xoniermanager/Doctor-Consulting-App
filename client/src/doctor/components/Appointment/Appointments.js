import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DoctSideBar from '../Layout/DoctSideBar';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { getDoctorAppointments } from '../../../Actions/User';
import Loader from '../Layout/Loader';

const Appointments = () => {

  const dispatch = useDispatch();
  
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  useEffect(() => {
    dispatch(getDoctorAppointments());
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  let { loading, doctorAppointments } = useSelector((state) => state.doctorAppointments);

  let allDoctorAppointments = doctorAppointments && doctorAppointments.map((element, index)=>{
    let cdate = Moment(element.createdAt).format('DD-MM-YYYY');
    let appDate = Moment(element.appointmentDate).format('DD-MM-YYYY');
    element = {
      ...element,
      sno : index+1,
      cdate : cdate,
      appDate : appDate
    }
    return element;
  })


  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }

  // const handleDeleteClick = async (e) =>{
  //   let id = e.target.id;
  //   const result = await confirm("Do you want to delete this?",options);
  //   if (result) {
  //     await dispatch(deleteAppointmentById(id));
  //     alert.success("Appointment deleted successfully");
  //     dispatch(allDoctorAppointments());
  //     dispatch({ type: "clearErrors" });
  //     dispatch({ type: "clearMessage" });
  //   }
  // }


  const columns = [
    {
      name: "S.No.",
      selector: "sno",
      sortable: true,
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
      name: "CREATED AT",
      selector: "cdate"
    },
    { 
      cell:(row) => <div className="d-flex">
      { row.isPrescription ? (<> <Link to={`/edit-prescription/${row._id}`} className="btn btn-primary shadow btn-sm sharp mr-1"><i className="fa fa-pencil"></i></Link> 
      <Link to={`/view-prescription/${row._id}`} className="btn btn-success shadow btn-sm sharp mr-1"><i className="fa fa-eye"></i></Link></>) : (<Link to={`/create-prescription/${row._id}`} className="btn btn-primary shadow btn-sm sharp mr-1"><i className="fa fa-plus"></i></Link>)}
      </div>,
      name: "Prescription",
    },
    {
      cell:(row) => <div className="d-flex"><a href={`${row.joinUrl}`} target="_blank" className="btn btn-primary shadow btn-sm sharp mr-1">Join</a></div>,
      name: "Meeting",
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };


  return (
    <>
    <Header title={'Appointments'}/>
    <DoctSideBar/>
    {loading === true ? <Loader /> : (<div className="content-body">
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
                    <div className="col-md-6 text-right">
                      {/* <Link
                        to="/create-appointment"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-plus"></i> Create Appointment
                      </Link> */}
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

export default Appointments;
