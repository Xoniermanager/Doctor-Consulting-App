import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDrug, getDrug } from '../../../Actions/User';
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DoctSideBar from '../Layout/DoctSideBar';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { confirm } from "react-confirm-box";
import Loader from '../Layout/Loader';

const Drugs = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDrug());
  }, [dispatch]);

  let { user } = useSelector((state) => state.user);
  
  let { loading, drugs } = useSelector((state) => state.drugs);

  let allDrugs = drugs && drugs.map((element, index)=>{
    let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
    element = {
      ...element,
      cdate : cdate,
      sno : index + 1
    }
    return element;
  })


  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

  const handleDeleteClick = async (e) =>{
    let id = e.target.id;
    const result = await confirm("Do you want to delete this?",options);
    if (result && id) {
      await dispatch(deleteDrug(id));
      alert.success("Drug deleted successfully");
      dispatch(getDrug());
    }
  }

 

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

  const columns = [
    {
      name: "S.No.",
      selector: "sno",
      sortable: true,
    },
    {
      name: "DRUG NAME",
      selector: "drugName",
      sortable: true,
    },
    {
      name: "DRUG GENERIC",
      selector: "drugGeneric",
      sortable: true,
    },
    {
      name: "DATE",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) => <div style={{display : row.owner.toString() === user._id ? 'block' : 'none' }}><Link to={`/drug-edit/${row._id}`}  class="btn btn-primary shadow btn-sm sharp mr-1"><i class="fa fa-edit"></i></Link>
      <button type='button' id={row._id} onClick={handleDeleteClick} class="btn btn-danger shadow btn-sm sharp mr-1"><i class="fa fa-trash"></i></button></div>,
      name: "ACTIONS",
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <> 
      <Header title={'Drugs'}/>
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
                      <h4 className="card-title">All Drugs</h4>
                    </div>
                    <div className="col-md-6 text-right">
                      <Link
                        to="/create-drug"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-plus"></i> New Drug
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Paper>
                    <DataTable
                      columns={columns}
                      data={allDrugs}
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
  )
}

export default Drugs