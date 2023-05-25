import React, { useEffect, useState } from "react";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { getDoctorMonthlyEarning,doctorDetailById } from "../../../Actions/User";
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";

import { Link } from "react-router-dom";
import { getDashboardData } from "../../../Actions/Admin";


const Transaction = () => {

  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.user);

  //console.log(user.doctors[0]);
  //console.log(localStorage.getItem("token"));

  useEffect(async () => {
    await dispatch(getDoctorMonthlyEarning(user.doctors[0]));
  }, [])

  const { loading , doctorMonthlyEarning } = useSelector((state) => state.doctorMonthlyEarning);
  //console.log('payment',doctorMonthlyEarning);

  
  

  let allTranaction =  doctorMonthlyEarning && doctorMonthlyEarning.map((element, index) => {
    //console.log(element.amount);

    let amounts = element.amount;
    let patientId = element.patientId;
    let status = element.status;
    let createdAt = Moment(element.updatedDate).format('DD-MM-YYYY');
    let txn_id = element.txnId;
    element = {
        ...element,
        sno: index + 1,
        patientname: element.patientName,
        phone:element.patientPhone,
        txnid:txn_id,
        status:status,
        cdate: createdAt,
    }
    return element;
  })

  const columns = [
    {
      name: "S.No.",
      selector: "sno",
      sortable: true,
    },
    {
      name: "PATIENT NAME",
      selector: "patientname",
      sortable: true,
    },
    {
      name: "CONTACT No.",
      selector: "phone",
    },
    {
      name: "TRANSACTION ID",
      selector: "txnid",
    },
    {
        name: "STATUS",
        selector: "status"
    },
    {
        name: "DATE",
        selector: "cdate"
    },
    
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <>
      <Header title={'Dashboard'} />
      <DoctSideBar />
      {loading === true ? <Loader /> : (<div className="content-body">
        {/* <!-- row --> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header d-block py-3">
                  <div className="row">
                    <div className="col-7">
                      <h6 className="m-0 font-weight-bold text-primary w-75 p-2">
                        All Transaction
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Paper>
                    <DataTable
                      columns={columns}
                      data={allTranaction}
                      pagination
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

export default Transaction;
