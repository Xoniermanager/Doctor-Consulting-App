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
import { confirm } from "react-confirm-box";
import { deleteSlot, getSlots } from '../../../Actions/User';
import Loader from '../Layout/Loader';

const AppointmentSlot = () => {

  const dispatch = useDispatch();
  
  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.apiStatus);
  useEffect(() => {
    dispatch(getSlots());
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  let { slots } = useSelector((state) => state.slots);

  let allSlots = slots && slots.map((element,index)=>{
    let cdate = Moment(element.createdAt).format('DD-MM-YYYY');
    let slotStartDate = Moment(element.slotStartDate).format('DD-MM-YYYY');
    let slotEndDate = Moment(element.slotEndDate).format('DD-MM-YYYY');
    let interval = element.interval+' min';
    element = {
      ...element,
      slotStartDate : slotStartDate,
      slotEndDate : slotEndDate,
      interval : interval,
      cdate : cdate,
      sno : index+1
    }
    return element;
  })


  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }

  const handleDeleteClick = async (e) =>{
    let id = e.target.id;
    const result = await confirm("Do you want to delete this?",options);
    if (result && id) {
      await dispatch(deleteSlot(id));
      alert.success("Slot deleted successfully");
      dispatch(getSlots());
      dispatch({ type: "clearErrors" });
      dispatch({ type: "clearMessage" });
    }
  }


  const columns = [
    {
      name: "S.No.",
      selector: "sno",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: "slotStartDate",
      sortable: true,
    },
    {
      name: "End Date",
      selector: "slotEndDate",
      sortable: true,
    },
    {
      name: "Slot Interval",
      selector: "interval",
      sortable: true,
    },
    {
      cell:(row) => <div className="d-flex"><Link to={`/edit-slot/${row._id}`}  class="btn btn-primary shadow btn-sm sharp mr-1"><i class="fa fa-edit"></i></Link>
      <button type='button' id={row._id} onClick={handleDeleteClick} class="btn btn-danger shadow btn-sm sharp mr-1"><i class="fa fa-trash"></i></button></div>,
      name: "ACTIONS",
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };


  return (
    <>
    <Header title={'Appointments Slots'}/>
    <DoctSideBar/>
    { loading === true ? <Loader /> : (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-block">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">All Slots</h4>
                    </div>
                    <div className="col-md-6 text-right">
                      <Link
                        to="/create-slot"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-plus"></i> Create Slot
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Paper>
                    <DataTable
                      columns={columns}
                      data={allSlots}
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
      <Footer/>
    </>
  );
};

export default AppointmentSlot;
