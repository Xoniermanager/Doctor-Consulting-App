import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../../Actions/User";
import Header from "../Layout/Header";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Moment from 'moment';
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
const Patients = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);
  
  let { loading, patients } = useSelector((state) => state.patients);
  
  const getDifferenceInDays = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 365));
  }
  let patiens = patients && patients.map((element, index) => {
      let age = getDifferenceInDays(new Date(), new Date(element.birthday));
      let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
      element = {
        ...element,
        cdate : cdate,
        age : age,
        sno : index+1
      }
      return element;
  });


  const columns = [
    {
      name: "S.No.",
      selector: "sno",
    },
    {
      name: "PATIENT NAME",
      selector: "name",
      sortable: true,
    },
    {
      name: "AGE",
      selector: "age",
      sortable: true,
    },
    {
      name: "PHONE",
      selector: "phone",
      sortable: true,
    },
    {
      name: "BLOOD GROUP",
      selector: "bloodgroup",
      sortable: true,
    },
    {
      name: "DATE",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) =>  <Link to={`/doctor-patient-appointments/${row._id}`} className="btn btn-outline-primary btn-sm"><i className="fa fa-eye"></i></Link>,
      name: "APPOINTMENTS",
    },
    {
      cell:(row) =>  <Link to={`/doctor-patient-history/${row._id}`} className="btn btn-outline-primary btn-sm"><i className="fa fa-history"></i></Link>,
      name: "HISTORY",
    },
    // {
    //   cell:(row) => <div className="d-flex"> <Link to="view-patient.html" className="btn btn-success shadow btn-sm sharp mr-1"><i className="fa fa-eye"></i></Link>
    //   <button type="button" className="btn btn-primary shadow btn-sm sharp mr-1"><i className="fa fa-edit"></i></button>
    //   <button type="button" className="btn btn-danger shadow btn-sm sharp mr-1"><i className="fa fa-trash"></i></button></div>,
    //   name: "ACTIONS",
    // },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <>
      <Header title={'Patients'}/>
      <DoctSideBar />
     { loading === true ? <Loader /> : (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-block">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">All Patients</h4>
                    </div>
                    <div className="col-md-6 text-right">
                      <Link
                        to="/patient/create"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-plus"></i> New Patient
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Paper>
                    <DataTable
                      columns={columns}
                      data={patiens}
                      defaultSortField="name"
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
      <Footer />
    </>
  );
};

export default Patients;
