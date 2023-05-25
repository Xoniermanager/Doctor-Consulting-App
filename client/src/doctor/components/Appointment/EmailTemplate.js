import React, { useState, useRef, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { updateDoctorEmailTemplate, loadUser} from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";


const EmailTemplate = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);
  //console.log(user);

  const [formErrors, setFormErrors] = useState({});
  const intialValue = { email_template : user.email_template};
  const [profileValue, setProfileValue] = useState(intialValue);

  const handleChange = (e) =>{

    profileValue.email_template = e.target.value;
    setProfileValue({...profileValue});
  }
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.feeApiStatus);

// console.log(message);
// console.log(error);



  const handleFeeSubmit = async (e) =>{
    e.preventDefault();
    let { email_template } = profileValue;
    //console.log(profileValue);
    await setFormErrors(validate(profileValue));
    if(Object.keys(formErrors).length === 0){
        // console.log('empty');
         //console.log(email_template);
        await dispatch(updateDoctorEmailTemplate(email_template));

        alert.show('Email template update');

    }else{
        console.log('empty');
    }
  }
  


  const validate = (values) => {
    const errors = {};
    if (!values.email_template) {
      errors.email_template = "Fields is required!";
    }
    return errors;
  };
  
  
  return (
    <>
      <Header title={'Email Template'}/>
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
                      <label>Email Template</label>
                      <textarea name="template" onChange={handleChange} className="form-control" rows="8" placeholder="Something write here...">{profileValue.email_template}</textarea>
                      <span className="text-danger">{formErrors.email_template}</span>
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

export default EmailTemplate;
