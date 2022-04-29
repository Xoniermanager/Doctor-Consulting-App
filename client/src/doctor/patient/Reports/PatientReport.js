import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import PatientSideBar from "../Layout/PatientSideBar";
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { useAlert } from 'react-alert';
import { confirm } from "react-confirm-box";
import Moment from 'moment';
import {Link} from 'react-router-dom';
import { createReport, deleteAppointmentById, getPatientReports,  } from '../../../Actions/User';
import Loader from '../Layout/Loader';

const PatientReport = () => {
  const dispatch = useDispatch();  
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const initial = {doctorName : '', reportDate : '', diagnosis : ''};
  const [reportData, setReportData] = useState(initial);


  useEffect(() => {
    dispatch(getPatientReports());
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  let { loading, patientReports } = useSelector((state) => state.patientReports);

  let allReports = patientReports && patientReports.map((element)=>{
    let cdate = Moment(element.createdAt).format('DD-MM-YYYY');
    let reportDate = Moment(element.reportDate).format('DD-MM-YYYY');
    element = {
      ...element,
      cdate,
      reportDate,
    }
    return element;
  })

  const handleChange = (e) =>{
    setReportData({...reportData, [e.target.name]: e.target.value});
  } 

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
      await dispatch(deleteAppointmentById(id));
      alert.success("Appointment deleted successfully");
      dispatch(getPatientReports());
      dispatch({ type: "clearErrors" });
      dispatch({ type: "clearMessage" });
    }
  }

  const reportModal= useRef(null);
  const closeModal = () => {
    reportModal.current.click();
  }


  const columns = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
    },
    {
      name: "DOCTOR NAME",
      selector: "doctorName",
      sortable: true,
    },
    {
      name: "DATE",
      selector: "reportDate",
      sortable: true,
    },
    {
        name: "DIAGNOSIS",
        selector: "diagnosis",
        sortable: true,
    },
    {
      name: "Created Date",
      selector: "cdate"
    },
    {
      cell:(row) => <div className="d-flex">
      <button type='button' id={row._id} onClick={handleDeleteClick} className="btn btn-danger shadow sharp mr-2"><i class="fa fa-trash"></i></button>
      <a href={`${row.document.url}`} target="_blank" class="btn btn-primary shadow sharp mr-2" rel="noopener noreferrer" download><i class="fa fa-download"></i> </a>
      </div>,
      name: "ACTIONS",
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };
  
  const [reportDocument, setReportDocument] = useState('');

  const handleDocument = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setReportDocument({document: Reader.result });
      }
    };
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await dispatch(createReport(reportData, reportDocument));
    getPatientReports();
    closeModal();
    setReportData(initial);
  }

  return (
    <>
      <Header title={'Reports'}/>
      <PatientSideBar />
      {loading === true ? <Loader /> : (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header d-block">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="text-primary">All Reports</h4>
                    </div>
                    <div className="col-md-6 text-right">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-plus"></i> Add Reports
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                   <Paper>
                    <DataTable
                      columns={columns}
                      data={allReports}
                      defaultSortField="cdate"
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

      {/* Models */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add reports</h5>
              <button type="button" ref={reportModal} className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit} autoComplete='off'>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Doctor Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={reportData.doctorName}
                        placeholder=""
                        name='doctorName'
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Report Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder=""
                        onChange={handleChange}
                        value={reportData.reportDate}
                        name='reportDate'
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Diagnosis </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Diagnosis"
                        onChange={handleChange}
                        value={reportData.diagnosis}
                        name='diagnosis'
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Add Report </label>
                      <input
                        type="file"
                        className="form-control"
                        name="reportImage"
                        onChange={handleDocument}
                        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                        placeholder="Upload report"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientReport;
