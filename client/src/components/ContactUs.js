import React, { useEffect, useState } from 'react';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import PageTitle from './Layout/PageTitle';
import Background from '../images/about/pic-1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from '../Actions/Admin';
import Loader from './Loader';
import ReCAPTCHA from "react-google-recaptcha";
import { useAlert } from 'react-alert';
import { userEnquiry } from '../Actions/User';

const ContactUs = () => {

  // Google recaptcha 
  const [isGoogleValidate, setIsGoogleValidate] = useState(false);
  const onChange = (value) =>{
	setIsGoogleValidate(true);
  }

  let { departments } = useSelector((state) => state.departments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);


  const initialValue = {
    name: "",
    email: "",
    department : "",
    departmentId : "",
    message: ""
  };
  const [userValue, setUserValue] = useState(initialValue);

  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = (e) => {
    if(e.target.name == 'department'){
      let index = e.nativeEvent.target.selectedIndex;
      userValue.departmentId = e.target.value;
      userValue.department =  e.nativeEvent.target[index].text;
    }else{
      setUserValue({ ...userValue, [e.target.name]: e.target.value });
    }
  };

  const handleToSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(userValue));
    if(Object.keys(formErrors).length === 0){
      await dispatch(userEnquiry(userValue));
      alert.success('Enquiry submitted successfully')
    }
    return false;
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [formErrors, alert, error, dispatch, message]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.department) {
       errors.department = "Department is required!";
    }
    if (!values.phone) {
      errors.phone = "Phone is required!";
    }
    if (!phoneRegex.test(values.phone)) {
      errors.phone = "This is not a valid phone number!";
    }
    if (!values.message) {
      errors.message = "Message is required!";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : 'Contact Us' }} />
      { loading === true ? <Loader /> : (<section className="">
        <div className="container">
          <div className="contact-wraper">
            <div className="row">
              <div className="col-lg-6 mb-30">
                <form onSubmit={handleToSubmit}>
                  <div className="ajax-message"></div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <input name="name" onChange={handleOnChange} type="text" className="form-control" placeholder="Your Name" />
                      <span className='text-danger'>{formErrors.name}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <input name="email" onChange={handleOnChange} type="email" className="form-control" placeholder="Email"/>
                      <span className='text-danger'>{formErrors.email}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <input name="phone" onChange={handleOnChange} type="text" className="form-control" placeholder="Phone Numbers" />
                      <span className='text-danger'>{formErrors.phone}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <select name='department' onChange={handleOnChange} className="form-select form-control">
                        <option value=''>Select Department</option>
                        {departments && departments.map((dept)=>(
                          <option value={dept._id}>{dept.departmentName}</option>
                        ))}
                      </select>
                      <span className='text-danger'>{formErrors.department}</span>
                    </div>
                    <div className="form-group col-md-12">
                      <textarea name="message" onChange={handleOnChange} className="form-control" placeholder="Type Message"></textarea>
                      <span className='text-danger'>{formErrors.message}</span>
                    </div>
                    <div className="form-group col-md-12">
                      <ReCAPTCHA
                        sitekey="6LeXBkkbAAAAACYj7aMH2oWsIIkhpCGvm1LDQX9H"
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <button disabled={!isGoogleValidate} className="btn w-100 btn-secondary btn-lg">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-6 mb-30">
                <div className="contact-info ovpr-dark" style={{backgroundImage: "url(" + Background + ")"}}>
                  <div className="info-inner">
                    <h4 className="title mb-30">Contact Us For Any Informations</h4>
                    <div className="icon-box">
                      <h6 className="title"><i className="ti-map-alt"></i>Location</h6>		
                      <p>2005 Stokes Isle Apt. 896, Venaville 10010, USA</p>
                    </div>
                    <div className="icon-box">
                      <h6 className="title"><i className="ti-id-badge"></i>Email &amp; Phone</h6>		
                      <a href="javascript:void(0);" className="text-white">info@yourdomain.com</a>
                      <p>(+68) 120034509</p>
                    </div>
                    <div className="icon-box">
                      <h6 className="title"><i className="ti-world"></i>Follow Us</h6>
                      <ul className="social-media">
                        <li><a target="_blank" href="https://twitter.com/"><i className="fab fa-twitter"></i></a></li>
                        <li><a target="_blank" href="https://www.linkedin.com/"><i className="fab fa-linkedin"></i></a></li>
                        <li><a target="_blank" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)}
      
      {/* <!-- About us --> */}
      <section className="section-area section-sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature4">
                <div className="icon-md feature-icon">
                  <img src={require('../images/icon/icon1.png')} alt="" />
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Contact Number</h5>
                  <p>+001 123 456 790</p>
                  <p>+002 3424 44 00</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature3">
                <div className="icon-md feature-icon">
                  <img src={require('../images/icon/icon3.png')} alt="" />
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Email Address</h5>
                  <p>info@yourdomain.com</p>
                  <p>example@support.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature2">
                <div className="icon-md feature-icon">
                  <img src={require('../images/icon/icon2.png')} alt=""/>
                </div>
                <div className="icon-content">
                  <h5 className="ttr-title">Address</h5>
                  <p>2005 Stokes Isle Apt. 896, Venaville 10010, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
		
      <Footer />
    </>
  )
}

export default ContactUs