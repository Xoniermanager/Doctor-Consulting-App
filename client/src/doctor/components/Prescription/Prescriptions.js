import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePrescription, getPrescription } from '../../../Actions/User';
import Moment from 'moment';
import Header from '../Layout/Header';
import DoctSideBar from '../Layout/DoctSideBar';
import Footer from '../Layout/Footer';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { confirm } from "react-confirm-box";
import Loader from '../Layout/Loader';

const Prescriptions = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrescription());
  }, [dispatch]);

  let { loading, prescriptions } = useSelector((state) => state.prescriptions);

  console.log('prescriptions',prescriptions);

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
    if (result) {
      await dispatch(deletePrescription(id));
      dispatch(getPrescription());
      alert.success("Prescription deleted successfully");
    }
  }
  let all_drug = 0;
  let all_test = 0
  let allPrescriptions = prescriptions && prescriptions.map((element, index)=>{
    let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
    let contents = `${element.drugs.length} Drugs ${element.drugs.length} Tests`;
    all_drug = element.drugs && element.drugs.length;
    all_test = element.tests && element.tests.length;
    let patientName = element.patientDetail.length==0?'':element.patientDetail[0].name;
    //console.log(patientName);
    element = {
      ...element,
      cdate : cdate,
      contents : contents,
      sno : index + 1,
      patientName
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
      name: "PATIENT",
      selector: "patientName",
      sortable: true,
    },
    {
      name: "CREATED",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) => <div class="text-center"><label class="badge badge-primary-soft">

      {all_drug} Drugs 
   </label> <label class="badge badge-primary-soft">
      {all_test} Tests
   </label></div>,
      name: "CONTENT",
      selector: "contents",
      sortable: true,
    },
    {
      cell:(row) => 
      <div className="d-flex">

        <Link to={`/view-prescription/${row.appointmentId}`} className="btn btn-success shadow btn-sm sharp mr-1"><i className="fa fa-eye"></i></Link>

        {/* <Link to={`/print-prescription/${row._id}`} className="btn btn-info shadow btn-sm sharp"><i className="fa fa-print"></i></Link> */}

        <Link to={`/edit-prescription/${row.appointmentId}`} className="btn btn-primary shadow btn-sm sharp mr-1"><i className="fa fa-pencil"></i></Link>

        <button type='button' id={row._id} onClick={handleDeleteClick} className="btn btn-danger shadow btn-sm sharp"><i className="fa fa-trash"></i></button>
        
      </div>,
      name: "ACTIONS",
      selector: "actions",
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
     <> 
      <Header title={'Prescriptions'}/>
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
                      <h4 className="card-title">All Prescriptions</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Paper>
                    <DataTable
                      columns={columns}
                      data={allPrescriptions}
                      defaultSortField="name"
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
  )
}

export default Prescriptions