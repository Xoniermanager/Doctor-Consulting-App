import React, { useState, useRef, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { updateDoctorFee, loadUser} from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";


const AppointmentsFee = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);
  //console.log(user);

  const [formErrors, setFormErrors] = useState({});
  const intialValue = { fee : user.fee};
  const [profileValue, setProfileValue] = useState(intialValue);

  const handleChange = (e) =>{

    profileValue.fee = e.target.value;
    setProfileValue({...profileValue});
  }

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.feeApiStatus);

  //const {messages} = 'This is for testing';
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



  const handleFeeSubmit = async (e) =>{
    e.preventDefault();
    let { fee } = profileValue;
    //console.log(profileValue);
    await setFormErrors(validate(profileValue));
    if(Object.keys(formErrors).length === 0){
        // console.log('empty');
        // console.log(fee);
        await dispatch(updateDoctorFee(fee));
        alert.show('Appoinment fee update');
    }else{
        console.log('empty');
    }
  }
  


  const validate = (values) => {
    const errors = {};
    if (!values.fee) {
      errors.fee = "Appointment fees is required!";
    }
    return errors;
  };
  
  
  return (
    <>
      <Header title={'Appointments Fee'}/>
      <DoctSideBar />
      <div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="media  d-block text-center text-sm-left pb-4 border-bottom">
                    
                  <form onSubmit={handleFeeSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Appointment Fee</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="fee" value={profileValue.fee} onChange={handleChange}  onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                      />
                      <span className="text-danger">{formErrors.fee}</span>
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
          
        </div>
      </div>
      <Footer />
      
    </>
  );
};

export default AppointmentsFee;
