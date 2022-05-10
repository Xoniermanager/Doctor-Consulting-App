import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Loader from "../Layout/Loader";
import Moment from 'moment';
import { Link } from "react-router-dom";
import { getPatients, updateUserStatus } from "../../../Actions/Admin";
import { confirm } from "react-confirm-box";
import { useAlert } from "react-alert";
import SideBar from "../Layout/SideBar";

const AdminDoctors = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatients('doctor'));
  }, [dispatch]);
  
  let {loading, adminPatients  } = useSelector((state) => state.adminPatients);

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  
  const getDifferenceInDays = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 365));
  }
  let patiens = adminPatients && adminPatients.map((element, index) => {
      let age = getDifferenceInDays(new Date(), new Date(element.birthday));
      let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
      element = {
        ...element,
        cdate : cdate,
        age : age,
        sno : index + 1
      }
      return element;
  });

  const options = {
    labels: {
      confirmable: "Yes",
      cancellable: "No"
    }
  }

  const handleStatus = async(e) => {
    let id = e.target.id;
    const result = await confirm("Do you want to change status?",options);
    if (result) {
      await dispatch(updateUserStatus(id));
      dispatch(getPatients('doctor'));
      alert('Status updated successfuly.')
    }
  }

  const columns = [
    {
      name: "S.No.",
      selector: "sno"
    },
    {
      name: "DOCTOR NAME",
      selector: "name",
      sortable: true,
    },
    {
      name: "SPECIALITY",
      selector: "specialist",
      sortable: true,
    },
    {
      name: "DATE",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) => <button type="button" id={row._id} onClick={handleStatus} className={`btn ${row.status === 1 ? 'btn-success' : 'btn-danger'} shadow btn-sm sharp mr-1`}>{row.status === 1 ? 'Active' : 'Inactive'}</button>,
      name: "STATUS",
    },
    {
      cell:(row) => <div className="d-flex"> <Link to="#" className="btn btn-success shadow btn-sm sharp mr-1"><i className="fa fa-eye"></i></Link></div>,
      name: "ACTIONS",
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <>
      <Header title={'Doctors'}/>
      <SideBar />
      { loading === true ? <Loader /> : (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-block">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">All Doctors</h4>
                    </div>
                  <div className="col-md-6 text-right">
                    <Link
                      to="/admin/create-doctor"
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fa fa-plus"></i> Add Doctor
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
                      selectableRows
                      selectableRowsComponent={Checkbox}
                      selectableRowsComponentProps={
                        selectableRowsComponentProps
                      }
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

export default AdminDoctors;
