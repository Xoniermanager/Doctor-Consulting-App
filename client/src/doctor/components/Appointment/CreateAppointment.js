import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDoctorAppointment, getPatient, getSlotByDate ,doctorDetailById } from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from 'moment';
import Loader from "../Layout/Loader";

const CreateAppointment = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  let dt =  Moment(new Date()).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState(dt);

  const [patientDetail, setPatientDetail] = useState({patientId : '', patientName :''});
  const [formData, setFormData] = useState({ slotId : '', appointmentTime : '', appointmentDate : '', appointmentStartTime : '',  appointmentEndTime : '' });

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

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
    dispatch(getPatient());
    dispatch(getSlotByDate(dt));
    dispatch(doctorDetailById('626cd04a857ce8a353529632'));
  }, []);

  const { doctorDetails } = useSelector((state) => state.doctorDetails);

  let { patients } = useSelector((state) => state.patients);

  const {user} = useSelector((state)=>state.user);

  const handleOnChange = async (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let val = e.target.value;
    let value = val.split(',');
    setPatientDetail({ ...patientDetail, patientId : value[0], patientName : e.nativeEvent.target[index].text ,patientEmail:value[1],phone:value[2]});
  };

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }

  function isObj(val) {
    return typeof val === 'object'
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }
  function post(details) {
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }
  function buildForm({ action, params }) {

    //console.log(action);
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)

    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', stringifyValue(params[key]))
      form.appendChild(input)
    })
    //console.log('front_form',form);

    //return false; 
    return form
  }
  const getData = (data) => {

    return fetch(`https://single-doctor-app.herokuapp.com/api/v1/payments/paymentByDoctor`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
  }

  const submitData = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log(formData.doctorId);
    // console.log(patientDetail);
    //await dispatch(createDoctorAppointment(formData, patientDetail));
    // if(!error){
    //   history('/doctor-appointments')
    // }

    getData({amount:doctorDetails.fee,email:patientDetail.patientEmail,name:patientDetail.patientName,phone:patientDetail.phone,orderId:formData.slotId,doctorId:formData.doctorId,patientId:patientDetail.patientId}).then(response=>{
      var information={
        action:"https://securegw-stage.paytm.in/order/process",
        params:response
      }
      //console.log(information);
      post(information)

    })
  }; 

  const getSlotDetails = (e) =>{
    setFormData({slotId :  e.target.dataset.rdv_slotid, appointmentTime :  e.target.dataset.rdv_slottime, appointmentDate : selectDate , appointmentStartTime : e.target.dataset.rdv_time_start,   appointmentEndTime : e.target.dataset.rdv_time_end, doctorId: user._id});
  }
  
  const handleChange = async (e) => {
    e.preventDefault();
    let date = e.target.value;
    console.log(date);
    if (date) {
      setSelectDate(date);
      await dispatch(getSlotByDate(date));
    }
  };
  const { loading, dateSlots } = useSelector((state) => state.dateSlots);
  let bookedSlot = dateSlots && dateSlots.bookedSlots ? dateSlots.bookedSlots : [];
  let bookedData = bookedSlot && bookedSlot.map((book) => book.slotId);


  return (
    <>
      <Header title={'Create Appointment'}/>
      <DoctSideBar />
     { loading === true ? <Loader /> : (<div className="content-body">
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
                          <option value=""> Select Patient...</option>
                         { patients && patients.map(patient => (
                          <option value={patient._id+','+patient.email+','+patient.phone}>
                          {patient.name}
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
                     
                    </div>
                    <div className="col-md-8 col-sm-12">
                      <label for="date">Available Time Slots</label>
                      <hr />
                      <div className="row mb-2 myorders">
                      {dateSlots &&  dateSlots.allSlots && 
                          dateSlots.allSlots.slots.map((slt, index) => (
                        <>
                            <div key={index} className="col-sm-6 col-md-4 mb-2">
                            {Moment() > Moment(selectDate+' '+slt.slot.split('-')[0].trim()) ? (<button class="btn btn-warning btn-block" disabled>{slt.slot}</button>) : ( bookedData && bookedData.includes(slt._id) ? (<button class="btn btn-danger btn-block">{slt.slot}</button>) : (<button type="button"
                                onClick={getSlotDetails}
                                className="btn btn-primary btn-block"
                                data-toggle="modal"
                                data-target={`#RDVModalSubmit_${index}`}
                                data-rdv_slotid={slt._id}
                                data-rdv_slottime={slt.slot}
                                data-rdv_date={dateSlots.slotDate}
                                data-rdv_time_start={slt.slot.split('-')[0].trim()}
                                data-rdv_time_end={slt.slot.split('-')[1].trim()}
                              > {slt.slot}</button>) ) }
                             </div>

                             <div key={slt._id} className="modal fade" id={`RDVModalSubmit_${index}`}>
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Are you sure of the date</h5>
                                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                                        </div>
                                        <div className="modal-body">
                                        <p><b>Patient :</b> <span> {patientDetail.patientName} (ID : {patientDetail.patientId})</span></p>
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
      </div>)}
      <Footer />
    </>
  );
};

export default CreateAppointment;
