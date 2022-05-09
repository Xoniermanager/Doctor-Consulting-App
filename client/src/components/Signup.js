import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { registerUser } from "../Actions/User";
import { getDepartments } from "../Actions/Admin";

const Signup = () => {
  let history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  let { departments } = useSelector((state) => state.departments);


  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  // register
  const initialValue = { name: "", email: "", password: "", phone :"", conf_password: "", departmentId : "",  department : "", role :"patient" };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [certificate, setCertificate] = useState('');

  const handleChange = (e) => {
    
    if(e.target.name === 'role'){
      setIsDoctor(!isDoctor);
    }
    if(e.target.name == 'department'){
      let index = e.nativeEvent.target.selectedIndex;
      formValues.departmentId = e.target.value;
      formValues.department =  e.nativeEvent.target[index].text;
    }else{
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setFormErrors(validate(formValues));
    let { name, email, password, role, phone, conf_password, departmentId, department } = formValues;
    setIsSubmit(true);
    if(password.length >5 && password === conf_password){
       await dispatch(registerUser(name, email, password, role, phone, departmentId, department, certificate));
      if (!error ) {
        history("/login");
      }
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
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "Phone is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password.length <=5) {
      errors.password = "Password should be min 6 characters";
    }
    if (values.password !== values.conf_password) {
      errors.conf_password = "Password and confirm password should be matched.";
    }
    return errors;
  };
  const handleCertificationChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setCertificate(Reader.result);
      }
    };
  };

  return (
    <>
      <div className="section-area account-wraper2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="appointment-form form-wraper">
                <div className="logo">
                  <img src={logo} alt="" />
                </div>

                {error === "" && isSubmit ? (
                  <div className="ui message success">
                    Signed in successfully
                  </div>
                ) : (
                  ""
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{formErrors.name}</span>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{formErrors.email}</span>
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{formErrors.phone}</span>
                  </div>

                  <div className="form-group">
                  <select className="form-control" name="role" value={formValues.role}
                      onChange={handleChange}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                  </div>

                 { isDoctor ? (<><div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      placeholder="MCI Certificate Upload"
                      name="certificate"
                      accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                      onChange={handleCertificationChange}
                    />
                  </div>
                  <div className="form-group">
                  <select className="form-control" name="department" onChange={handleChange}>
                     <option value="">Select Department</option>
                      { departments && departments.map((depat)=> (
                        <option value={depat._id}>{depat.departmentName}</option>
                        ))}
                  </select>
                  </div>
                  </> ) : '' }

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{formErrors.password}</span>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="conf_password"
                      value={formValues.conf_password}
                      onChange={handleChange}
                    />
                    <span className="text-danger">
                      {formErrors.conf_password}
                    </span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 radius-xl"
                    >
                      Register Now
                    </button>
                  </div>
                  <div className="text-center mt-40">
                    <p className="mt-0">Already have an account?</p>
                    <Link
                      className="btn btn-lg btn-secondary w-100"
                      to="/login"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
