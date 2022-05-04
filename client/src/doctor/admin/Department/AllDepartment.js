import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import { confirm } from "react-confirm-box";
import { useAlert } from 'react-alert';
import SideBar from '../Layout/SideBar';
import Loader from '../Layout/Loader';
import { deleteDepartment, getDepartments } from '../../../Actions/Admin';

const AllDepartment = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  let { loading, departments } = useSelector((state) => state.departments);

  let allDepartments = departments && departments.map((element,index)=>{
    let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
    element = {
      sn : index + 1,
      ...element,
      cdate : cdate
    }
    return element;
  })


  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }

  const handleDeleteClick = async (e) =>{
    let id = e.target.id;
    const result = await confirm("Do you want to delete this?",options);
    if (result) {
      await dispatch(deleteDepartment(id));
      dispatch(getDepartments());
      alert.success("Department deleted successfully");
    }
  }


  const columns = [
    {
      name: "S.No.",
      selector: "sn",
      sortable: true,
    },
    {
      name: "DEPARTMENT NAME",
      selector: "departmentName",
      sortable: true,
    },
    {
      cell:(row) => <img style={{height:'50px'}} src={row.icon.url} alt={row.departmentName} />,
      name: "DEPARTMENT ICON"
    },
    {
      name: "DATE",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) => <div className="d-flex"><Link to={`/admin/department-edit/${row._id}`} className="btn btn-primary shadow btn-sm sharp mr-1"><i className="fa fa-edit"></i></Link>
      <button type='button' id={row._id} onClick={handleDeleteClick} className="btn btn-danger shadow btn-sm sharp mr-1"><i className="fa fa-trash"></i></button></div>,
      name: "ACTIONS"
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <> 
    <Header title={'Departments'} />
    <SideBar />
    { loading === true ? <Loader /> :  (<div className="content-body">
      <div className="container-fluid">
        {/* <!-- row --> */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header d-block">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="card-title">All Departments</h4>
                  </div>
                  <div className="col-md-6 text-right">
                    <Link
                      to="/admin/create-department"
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fa fa-plus"></i> New Department
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Paper>
                  <DataTable
                    columns={columns}
                    data={allDepartments}
                    defaultSortField="departmentName"
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
  )
}

export default AllDepartment