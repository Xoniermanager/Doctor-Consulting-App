import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePrescription, getPatientPrescription } from '../../../Actions/User';
import Moment from 'moment';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { confirm } from "react-confirm-box";
import PatientSideBar from '../Layout/PatientSideBar';
import Loader from '../Layout/Loader';

const PatientPrescriptions = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientPrescription());
  }, [dispatch]);

  let { loading, patientAllPrescription } = useSelector((state) => state.patientAllPrescription);

  console.log(patientAllPrescription);

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
      dispatch(getPatientPrescription());
      alert.success("Prescription deleted successfully");
    }
  }

  let allPrescriptions = patientAllPrescription && patientAllPrescription.map((element)=>{
    let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
    let contents = `${element.drugs.length} Drugs ${element.drugs.length} Tests`;
    element = {
      ...element,
      cdate : cdate,
      contents : contents
    }
    return element;
  })

  const columns = [
    {
      name: "ID",
      selector: "_id",
      sortable: true,
    },
    {
      name: "Doctor Name",
      selector: "doctorDetail[0].name",
      sortable: true,
    },
    {
      name: "CREATED",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) => <div class="text-center"><label class="badge badge-primary-soft">
      1 Drugs
   </label> <label class="badge badge-primary-soft">
      0 Tests
   </label></div>,
      name: "CONTENT",
      selector: "contents",
      sortable: true,
    },
    {
      cell:(row) => 
      <div className="d-flex">
        <Link to={`/patient/view-prescription/${row._id}`} className="btn btn-success shadow btn-sm"><i className="fa fa-eye"></i></Link>
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
      <PatientSideBar />
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

export default PatientPrescriptions