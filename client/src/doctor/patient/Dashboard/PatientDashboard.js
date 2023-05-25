import PatientSideBar from "../Layout/PatientSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import MediaItem from "./MediaItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getPatientDashboard, getPatientPayment } from "../../../Actions/User";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  let dt = Moment(new Date()).format("YYYY-MM-DD");
  const { user } = useSelector((state) => state.user);
  //console.log('user',user);
  let patientId = user && user._id;
  useEffect(async () => {
    await dispatch(getPatientDashboard(dt));
    await dispatch(getPatientPayment(patientId));
  }, []);
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const { patientPayment } = useSelector((state) => state.patientPayment);

  //console.log("patientPayment", patientPayment);

  var amount = 0;
  patientPayment &&
    patientPayment.map((element, index) => {
      //console.log(element.amount);
      if (typeof element.updatedDate !== "undefined") {
        amount += element.amount;
      }
    });

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

  let { loading, patientDashBoard } = useSelector(
    (state) => state.patientDashBoard
  );
  let allDoctorAppointments = [];
  let allTodayAppointments = [];

  //console.log(patientDashBoard.todayApp);
  if (patientDashBoard != undefined) {
    allDoctorAppointments = patientDashBoard.todayApp.map((element, index) => {
      let cdate = Moment(element.createdAt).format("DD-MM-YYYY");
      let appDate = Moment(element.appointmentDate).format("DD-MM-YYYY");
      //console.log(index);
      if(appDate==Moment(new Date()).format("DD-MM-YYYY")){
        allTodayAppointments = patientDashBoard.todayApp;
      }
      let status = '';
      if(typeof element.orderStatus === 'undefined'){
        status = 'Failed';
      }else{
        status = element.orderStatus;
      }
      let doctorName = element.doctors[0].name;
      let time = element.appointmentStartTime.split(':');
      let hour = time[0];
      let mintues = time[1].split(' ');
      time = hour+':'+mintues[0];
      let appDateTime = new Date(Moment(element.appointmentDate).format("YYYY-MM-DD")+' '+time);

      let time2 = element.appointmentEndTime.split(':');
      let hour2 = time2[0];
      let mintues2 = time2[1].split(' ');
      time2 = hour2+':'+mintues2[0];

      let appDateTime2 = new Date(Moment(element.appointmentDate).format("YYYY-MM-DD")+' '+time2);

      let join = 0;
      if(new Date()>=appDateTime && new Date()<=appDateTime2){
        join = 1;
      }
      
      element = {
        ...element,
        sno: index + 1,
        appDate: appDate,
        doctorName,
        status,
        join
      };
      return element;
    });
  }
 // console.log(allTodayAppointments[0]);

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  const showSlots = (doctId) => {
    history(`/patient/create-appointment/${doctId}`);
  };

  const columns = [
    {
      name: "S.No.",
      selector: "sno",
      sortable: true,
    },
    {
      name: "Doctor Name",
      selector: "doctorName",
      sortable: true,
    },
    {
      name: "Appointment Date",
      selector: "appDate",
      sortable: true,
    },
    {
      name: "Slot Time",
      selector: "appointmentTime",
      sortable: true,
    },
    
    {
      name: "Payment Status",
      selector: "status",
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="d-flex">
        {
          row.join==1 ? (<> <a
            href={`${row.joinUrl}`}
            target="_blank"
            className="btn btn-primary shadow btn-sm sharp mr-1"
          >
            Join
          </a></>):(<><a> 
            Not Available
          </a></>)
        }
          
        </div>
      ),
      name: "Meeting",
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <>
      <Header title={"Dashboard"} />
      <PatientSideBar />
      {loading === true ? (
        <Loader />
      ) : (
        <div className="content-body">
          {/* <!-- row --> */}
          <div className="container-fluid">
            <div className="row">
              <MediaItem
                data={{
                  bcolor: "#369DC9",
                  title: "Appointment",
                  dataCount:
                    patientDashBoard != undefined ? patientDashBoard.allApp : 0,
                  sign: "M18.875 9.25C21.0787 11.6256 25.1753 16.0091 26.4375 17.5H1V1L10.625 13.375L18.875 9.25Z",
                  sign2:
                    "M26.4375 17.5C25.1753 16.0091 21.0787 11.6256 18.875 9.25L10.625 13.375L1 1",
                  incDcr:
                    patientDashBoard != undefined ? patientDashBoard.allApp : 0,
                  dataIcon:
                    "M35 5H33.3333C33.3333 3.67392 32.8065 2.40215 31.8689 1.46447C30.9312 0.526784 29.6594 0 28.3333 0C27.0072 0 25.7355 0.526784 24.7978 1.46447C23.8601 2.40215 23.3333 3.67392 23.3333 5H16.6667C16.6667 3.67392 16.1399 2.40215 15.2022 1.46447C14.2645 0.526784 12.9927 7.45058e-08 11.6667 7.45058e-08C10.3406 7.45058e-08 9.06881 0.526784 8.13113 1.46447C7.19345 2.40215 6.66667 3.67392 6.66667 5H5C3.67392 5 2.40215 5.52678 1.46447 6.46447C0.526784 7.40215 0 8.67392 0 10L0 35C0 36.3261 0.526784 37.5979 1.46447 38.5355C2.40215 39.4732 3.67392 40 5 40H35C36.3261 40 37.5979 39.4732 38.5355 38.5355C39.4732 37.5979 40 36.3261 40 35V10C40 8.67392 39.4732 7.40215 38.5355 6.46447C37.5979 5.52678 36.3261 5 35 5ZM5 8.33333H6.66667C6.66667 9.65942 7.19345 10.9312 8.13113 11.8689C9.06881 12.8065 10.3406 13.3333 11.6667 13.3333C12.1087 13.3333 12.5326 13.1577 12.8452 12.8452C13.1577 12.5326 13.3333 12.1087 13.3333 11.6667C13.3333 11.2246 13.1577 10.8007 12.8452 10.4882C12.5326 10.1756 12.1087 10 11.6667 10C11.2246 10 10.8007 9.8244 10.4882 9.51184C10.1756 9.19928 10 8.77536 10 8.33333V5C10 4.55797 10.1756 4.13405 10.4882 3.82149C10.8007 3.50893 11.2246 3.33333 11.6667 3.33333C12.1087 3.33333 12.5326 3.50893 12.8452 3.82149C13.1577 4.13405 13.3333 4.55797 13.3333 5V6.66667C13.3333 7.10869 13.5089 7.53262 13.8215 7.84518C14.134 8.15774 14.558 8.33333 15 8.33333H23.3333C23.3333 9.65942 23.8601 10.9312 24.7978 11.8689C25.7355 12.8065 27.0072 13.3333 28.3333 13.3333C28.7754 13.3333 29.1993 13.1577 29.5118 12.8452C29.8244 12.5326 30 12.1087 30 11.6667C30 11.2246 29.8244 10.8007 29.5118 10.4882C29.1993 10.1756 28.7754 10 28.3333 10C27.8913 10 27.4674 9.8244 27.1548 9.51184C26.8423 9.19928 26.6667 8.77536 26.6667 8.33333V5C26.6667 4.55797 26.8423 4.13405 27.1548 3.82149C27.4674 3.50893 27.8913 3.33333 28.3333 3.33333C28.7754 3.33333 29.1993 3.50893 29.5118 3.82149C29.8244 4.13405 30 4.55797 30 5V6.66667C30 7.10869 30.1756 7.53262 30.4882 7.84518C30.8007 8.15774 31.2246 8.33333 31.6667 8.33333H35C35.442 8.33333 35.866 8.50893 36.1785 8.82149C36.4911 9.13405 36.6667 9.55797 36.6667 10V16.6667H3.33333V10C3.33333 9.55797 3.50893 9.13405 3.82149 8.82149C4.13405 8.50893 4.55797 8.33333 5 8.33333ZM35 36.6667H5C4.55797 36.6667 4.13405 36.4911 3.82149 36.1785C3.50893 35.866 3.33333 35.442 3.33333 35V20H36.6667V35C36.6667 35.442 36.4911 35.866 36.1785 36.1785C35.866 36.4911 35.442 36.6667 35 36.6667Z",
                }}
              />

              <MediaItem
                data={{
                  bcolor: "#2bc155",
                  title: "Prescriptions",
                  dataCount:
                    patientDashBoard != undefined
                      ? patientDashBoard.allPres
                      : 0,
                  sign: "M18.875 9.25C21.0787 11.6256 25.1753 16.0091 26.4375 17.5H1V1L10.625 13.375L18.875 9.25Z",
                  sign2:
                    "M26.4375 17.5C25.1753 16.0091 21.0787 11.6256 18.875 9.25L10.625 13.375L1 1",
                  incDcr:
                    patientDashBoard != undefined
                      ? patientDashBoard.allPres
                      : 0,
                  dataIcon:
                    "M35 5H33.3333C33.3333 3.67392 32.8065 2.40215 31.8689 1.46447C30.9312 0.526784 29.6594 0 28.3333 0C27.0072 0 25.7355 0.526784 24.7978 1.46447C23.8601 2.40215 23.3333 3.67392 23.3333 5H16.6667C16.6667 3.67392 16.1399 2.40215 15.2022 1.46447C14.2645 0.526784 12.9927 7.45058e-08 11.6667 7.45058e-08C10.3406 7.45058e-08 9.06881 0.526784 8.13113 1.46447C7.19345 2.40215 6.66667 3.67392 6.66667 5H5C3.67392 5 2.40215 5.52678 1.46447 6.46447C0.526784 7.40215 0 8.67392 0 10L0 35C0 36.3261 0.526784 37.5979 1.46447 38.5355C2.40215 39.4732 3.67392 40 5 40H35C36.3261 40 37.5979 39.4732 38.5355 38.5355C39.4732 37.5979 40 36.3261 40 35V10C40 8.67392 39.4732 7.40215 38.5355 6.46447C37.5979 5.52678 36.3261 5 35 5ZM5 8.33333H6.66667C6.66667 9.65942 7.19345 10.9312 8.13113 11.8689C9.06881 12.8065 10.3406 13.3333 11.6667 13.3333C12.1087 13.3333 12.5326 13.1577 12.8452 12.8452C13.1577 12.5326 13.3333 12.1087 13.3333 11.6667C13.3333 11.2246 13.1577 10.8007 12.8452 10.4882C12.5326 10.1756 12.1087 10 11.6667 10C11.2246 10 10.8007 9.8244 10.4882 9.51184C10.1756 9.19928 10 8.77536 10 8.33333V5C10 4.55797 10.1756 4.13405 10.4882 3.82149C10.8007 3.50893 11.2246 3.33333 11.6667 3.33333C12.1087 3.33333 12.5326 3.50893 12.8452 3.82149C13.1577 4.13405 13.3333 4.55797 13.3333 5V6.66667C13.3333 7.10869 13.5089 7.53262 13.8215 7.84518C14.134 8.15774 14.558 8.33333 15 8.33333H23.3333C23.3333 9.65942 23.8601 10.9312 24.7978 11.8689C25.7355 12.8065 27.0072 13.3333 28.3333 13.3333C28.7754 13.3333 29.1993 13.1577 29.5118 12.8452C29.8244 12.5326 30 12.1087 30 11.6667C30 11.2246 29.8244 10.8007 29.5118 10.4882C29.1993 10.1756 28.7754 10 28.3333 10C27.8913 10 27.4674 9.8244 27.1548 9.51184C26.8423 9.19928 26.6667 8.77536 26.6667 8.33333V5C26.6667 4.55797 26.8423 4.13405 27.1548 3.82149C27.4674 3.50893 27.8913 3.33333 28.3333 3.33333C28.7754 3.33333 29.1993 3.50893 29.5118 3.82149C29.8244 4.13405 30 4.55797 30 5V6.66667C30 7.10869 30.1756 7.53262 30.4882 7.84518C30.8007 8.15774 31.2246 8.33333 31.6667 8.33333H35C35.442 8.33333 35.866 8.50893 36.1785 8.82149C36.4911 9.13405 36.6667 9.55797 36.6667 10V16.6667H3.33333V10C3.33333 9.55797 3.50893 9.13405 3.82149 8.82149C4.13405 8.50893 4.55797 8.33333 5 8.33333ZM35 36.6667H5C4.55797 36.6667 4.13405 36.4911 3.82149 36.1785C3.50893 35.866 3.33333 35.442 3.33333 35V20H36.6667V35C36.6667 35.442 36.4911 35.866 36.1785 36.1785C35.866 36.4911 35.442 36.6667 35 36.6667Z",
                }}
              />
              <MediaItem
                data={{
                  bcolor: "#775cc7",
                  title: "All Payment",
                  dataCount: amount,
                  sign: "M18.875 9.25C21.0787 11.6256 25.1753 16.0091 26.4375 17.5H1V1L10.625 13.375L18.875 9.25Z",
                  sign2:
                    "M26.4375 17.5C25.1753 16.0091 21.0787 11.6256 18.875 9.25L10.625 13.375L1 1",
                  incDcr: amount,
                  dataIcon:
                    "M9.21864 35H11.6667V31.7747C17.7104 31.496 21.0001 27.7133 21.0001 23.413C21.0001 17.2412 15.7596 16.0865 11.6667 14.8919V8.72014C12.7378 9.11832 13.4645 10.0341 13.6175 11.5074H20.6175C20.2733 6.45051 16.9072 3.66325 11.6667 3.22526V0H9.21864V3.22526C4.01645 3.58362 6.10352e-05 6.53015 6.10352e-05 11.5074C6.10352e-05 17.7588 5.12574 18.9534 9.21864 20.0683V26.3595C7.91809 25.9215 7.15307 24.9261 7.00006 23.2935H0.0383124C0.229569 28.43 4.01645 31.2571 9.21864 31.7349V35ZM14.1531 23.6519C14.1531 25.1251 13.1968 26.2002 11.6667 26.479V20.8248C13.1585 21.4221 14.1531 22.2184 14.1531 23.6519ZM6.92356 11.1889C6.92356 9.63595 7.80334 8.75995 9.21864 8.52105V14.0557C7.84159 13.4187 6.92356 12.5825 6.92356 11.1889Z",
                }}
              />

              <div className="col-md-12">
                <div className="card shadow mb-4">
                  <div className="card-header d-block py-3">
                    <div className="row">
                      <div className="col-7">
                        <h6 className="m-0 font-weight-bold text-primary w-75 p-2">
                          Upcoming Appointment's
                        </h6>
                      </div>
                      <div className="col-5">
                        <button
                          type="button"
                          onClick={(e) => {
                            showSlots("626cd04a857ce8a353529632");
                          }}
                          className="btn btn btn-primary float-right"
                        >
                          New Appointment
                        </button>
                        {/* <Link
                        to="/patient/doctor-list"
                        className="btn btn-primary float-right mr-2"
                      >
                        <i className="fa fa-plus"></i> New Appointment
                      </Link> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Paper>
                      <DataTable
                        columns={columns}
                        data={allDoctorAppointments}
                        defaultSortField="appDate"
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
        </div>
      )}
      <Footer />
    </>
  );
};

export default PatientDashboard;
