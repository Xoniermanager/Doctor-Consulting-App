import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTest, getTests } from '../../../Actions/User';
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DoctSideBar from '../Layout/DoctSideBar';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import { confirm } from "react-confirm-box";
import { useAlert } from 'react-alert';

const AllTests = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTests());
  }, [dispatch]);

  let { tests } = useSelector((state) => state.tests);

  let allTests = tests && tests.map((element)=>{
    let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
    element = {
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
      await dispatch(deleteTest(id));
      dispatch(getTests());
      alert.success("Test deleted successfully");
    }
  }


  const columns = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
    },
    {
      name: "TEST NAME",
      selector: "testName",
      sortable: true,
    },
    {
      name: "DATE",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) => <div className="d-flex"><Link to={`/test-edit/${row._id}`} className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-edit"></i></Link>
      <button type='button' id={row._id} onClick={handleDeleteClick} className="btn btn-danger shadow btn-xs sharp mr-1"><i className="fa fa-trash"></i></button></div>,
      name: "ACTIONS"
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <> 
    <Header />
    <DoctSideBar />
    <div className="content-body">
      <div className="container-fluid">
        {/* <!-- row --> */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header d-block">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="card-title">All Tests</h4>
                  </div>
                  <div className="col-md-6 text-right">
                    <Link
                      to="/create-test"
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fa fa-plus"></i> New Test
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Paper>
                  <DataTable
                    columns={columns}
                    data={allTests}
                    defaultSortField="testName"
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
    </div>
    <Footer />
  </>
  )
}

export default AllTests