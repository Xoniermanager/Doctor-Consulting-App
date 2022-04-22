import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDoctorAppointment,  getDoctors,  getSlotByDate } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from 'moment';
import PatientSideBar from "../Layout/PatientSideBar";

const CreatePatientAppointment = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  let dt =  Moment(new Date()).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState('');

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

  const [doctorId, setDoctorId] = useState('');

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

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  let { doctors } = useSelector((state) => state.doctors);
  const {user} = useSelector((state)=>state.user);

  const [patientDetail, setPatientDetail] = useState({patientId : user._id, patientName :user.name});
  const [doctorDetail, setDoctorDetail] = useState({doctorId : '', doctorName :''});
  const [formData, setFormData] = useState({ slotId : '', appointmentTime : '', appointmentDate : '', appointmentStartTime : '',  appointmentEndTime : '' });

  const handleOnChange = async (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    setDoctorId(e.target.value);
    setDoctorDetail({ ...doctorDetail, doctorId : e.target.value, doctorName :  e.nativeEvent.target[index].text, patientId : user._id, patientName : user.name });
  };

  const submitData = async (e) => {
    e.preventDefault();
    await dispatch(createDoctorAppointment(formData, patientDetail));
    if(!error){
      history('/patient/appointments')
    }
  }; 

  const getSlotDetails = (e) =>{
    setFormData({slotId :  e.target.dataset.rdv_slotid, appointmentTime :  e.target.dataset.rdv_slottime, appointmentDate : selectDate, appointmentStartTime : e.target.dataset.rdv_time_start,   appointmentEndTime : e.target.dataset.rdv_time_end, doctorId: doctorId});
  }
  
  const handleChange = async (e) => {
    e.preventDefault();
    let date = e.target.value;
    if (date && doctorId) {
      setSelectDate(date);
      await dispatch(getSlotByDate(date, doctorId));
    }
  };
  const { dateSlots } = useSelector((state) => state.dateSlots);
  let bookedSlot = dateSlots && dateSlots.bookedSlots ? dateSlots.bookedSlots : [];
  let bookedData = bookedSlot && bookedSlot.map((book) => book.slotId);
  return (
    <>
      <Header />
      <PatientSideBar />
      <div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h4 className="text-primary">New Appointment</h4>
                </div>
                <div className="card-body" data-select2-id="select2-data-6-tqdb">
                  <form onSubmit={submitData}>
                  <div className="row" data-select2-id="select2-data-5-akdn">
                    <div className="col-md-4 col-sm-12">
                      <div
                        className="form-group"
                        data-select2-id="select2-data-4-e5qv"
                      >
                        <label for="patient_name">Patient </label>
                        <select onChange={handleOnChange}
                          name="patientId"
                          className="form-control patient_name multiselect-doctorino select2-hidden-accessible"
                          data-select2-id="select2-data-patient_name"
                          tabIndex="-1"
                          aria-hidden="true"
                        >
                          <option value=""> Select Doctor...</option>
                         { doctors && doctors.map(doctors => (
                          <option value={doctors._id}>
                          {doctors.name}
                          </option>
                         ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label for="rdvdate">Date</label>
                        <div role="wrapper" className="input-group">
                          <input type="date"  onChange={handleChange} min={dt} value={selectDate} className="form-control" />
                        </div>
                      </div>
                      {/* <div className="form-check">
                        <input
                          type="checkbox"
                          name="sms"
                          className="form-check-input"
                        />
                        <label for="sms" className="form-check-label">
                          Notify patient by SMS
                        </label>
                      </div> */}
                    </div>
                    <div className="col-md-8 col-sm-12">
                      <label for="date">Available Time Slots</label>
                      <hr />
                      <div className="row mb-2 myorders">
                      {dateSlots &&  dateSlots.allSlots && 
                          dateSlots.allSlots.slots.map((slt, index) => (
                        <>
                            <div key={index} className="col-sm-6 col-md-4 mb-2">
                            { bookedData.includes(slt._id) ? (<button class="btn btn-danger btn-block">{slt.slot}</button>) : (<button type="button"
                                onClick={getSlotDetails}
                                className="btn btn-primary btn-block"
                                data-toggle="modal"
                                data-target={`#RDVModalSubmit_${index}`}
                                data-rdv_slotid={slt._id}
                                data-rdv_slottime={slt.slot}
                                data-rdv_date={dateSlots.slotDate}
                                data-rdv_time_start={slt.slot.split('-')[0].trim()}
                                data-rdv_time_end={slt.slot.split('-')[1].trim()}
                              > {slt.slot}</button>) }
                             </div>

                             <div key={slt._id} className="modal fade" id={`RDVModalSubmit_${index}`}>
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Are you sure of the date</h5>
                                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                                        </div>
                                        <div className="modal-body">
                                        <p><b>Patient :</b> <span> {doctorDetail.doctorName} (ID : {doctorDetail.doctorId})</span></p>
                                        <p><b>Date :</b> <label className="badge badge-primary-soft">{selectDate}</label></p>
                                        <p><b>Time Slot :</b> <label className="badge badge-primary-soft">{slt.slot}</label></p>

                                        <button className="btn btn-primary">Save</button>
                                    </div>                      
                                </div>
                            </div>
                        </div>
                     </> )) } 
                      </div>
                      <div
                        role="alert"
                        id="help-block"
                        className="alert alert-danger text-center"
                        style={{display: 'none' }}
                      >
                        <img src="#" />
                        <br /> <b>No date selected</b>
                      </div>
                    </div>
                  </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePatientAppointment;
