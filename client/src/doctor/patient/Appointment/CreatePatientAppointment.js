import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDoctorAppointment,  getSlotByDate } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from 'moment';
import PatientSideBar from "../Layout/PatientSideBar";
import Loader from "../Layout/Loader";

const CreatePatientAppointment = () => {
  const { doctId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();



  let dt =  Moment(new Date()).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState(dt);

  const [showBtn, setShowBtn] = useState('none');

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

  const doctorId = doctId;

  useEffect(async () => {
    await dispatch(getSlotByDate(selectDate, doctorId));
   }, []);

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

  const {user} = useSelector((state)=>state.user);

  const [patientDetail, setPatientDetail] = useState({patientId : user._id, patientName :user.name});
  const [formData, setFormData] = useState({ slotId : '', appointmentTime : '', appointmentDate : '', appointmentStartTime : '',  appointmentEndTime : '', doctorId : '' });

  const confirmedRef = useRef(null);
  const handleModalClick = () => {
    confirmedRef.current.click();
}

  const submitData = async (e) => {
    e.preventDefault();
    await dispatch(createDoctorAppointment(formData, patientDetail));
    if(!error){
      handleModalClick();
    }
  }; 

  const appointmentList = () =>{
    history('/patient/appointments')
  }

  const getSlotDetails = (e) =>{
    let div = document.getElementsByClassName('om');
    for (let i=0; i < div.length; i++) {
      div[i].className='btn btn-primary btn-block om';
     }
    e.target.className = 'btn btn-danger btn-block om';
    setShowBtn('block')
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
  const { loading, dateSlots } = useSelector((state) => state.dateSlots);
  let bookedSlot = dateSlots && dateSlots.bookedSlots ? dateSlots.bookedSlots : [];
  let bookedData = bookedSlot && bookedSlot.map((book) => book.slotId);

  return (
    <>
      <Header title={'New Appointment'} />
      <PatientSideBar />
      {loading === true ? <Loader /> : (<div className="content-body">
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
                            {Moment() > Moment(selectDate+' '+slt.slot.split('-')[0].trim()) ? (<button class="btn btn-warning btn-block" disabled>{slt.slot}</button>) : ( bookedData && bookedData.includes(slt._id) ? (<button class="btn btn-danger btn-block" disabled>{slt.slot}</button>) : (<button type="button"
                                onClick={getSlotDetails}
                                className="btn btn-primary btn-block om"
                                data-rdv_slotid={slt._id}
                                data-rdv_slottime={slt.slot}
                                data-rdv_date={dateSlots.slotDate}
                                data-rdv_time_start={slt.slot.split('-')[0].trim()}
                                data-rdv_time_end={slt.slot.split('-')[1].trim()}
                              > {slt.slot}</button>) ) }
                             </div>
                         </> )) } 
                      </div>
                      <button style={{display : showBtn}} className="btn btn-success text-center">Confirm</button>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


        <button type="button" ref={confirmedRef} data-toggle="modal" data-target="#RDVModalSubmit"></button>

         <div className="modal fade" id="RDVModalSubmit">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Appointment Confirmation </h4>
                            <button type="button" onClick={appointmentList} className="close" data-dismiss="modal"><span>&times;</span></button>
                        </div>
                        <div className="modal-body">
                        <h5>Dear {patientDetail.patientName}, </h5>
                        <p> We have successfully schedule your appointment for:</p>     
                       
                        <p className="text-info"> {formData.appointmentDate +' '+formData.appointmentTime } </p>
                    </div>                      
                </div>
            </div>
        </div>


      </div>)}
      <Footer />
    </>
  );
};

export default CreatePatientAppointment;
