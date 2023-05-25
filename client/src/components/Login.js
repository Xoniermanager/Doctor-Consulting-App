import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";
//import './Style2.css';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loginUser, loadUser } from "../Actions/User";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "./Loader";

import { registerNewUser } from "../utils/wssConnection/wssConnection";

const Login = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const alerts = useAlert();
  // login
  const loginInitialValue = { email: "", password: "", role: "" };
  const [loginValues, setLoginValues] = useState(loginInitialValue);
  const handleLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const [formErrors, setFormErrors] = useState({});

  const { user } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector((state) => state.apiStatus);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginValues.role == "") {
      alerts.show("Please select user role");
    } else {
      setFormErrors(validate_login(loginValues));
      let { password, email, role } = loginValues;
      await dispatch(loginUser(email, password, role));
      await dispatch(loadUser());
      dispatch(loadUser());
      //console.log('error',error)
      // if(error){

      // }
      if (!error && loginValues.role === "patient") {
        registerNewUser("xonier");
        let booking = localStorage.getItem("booking");
        if (booking) {
          localStorage.setItem("booking", "");
          if (localStorage.getItem("token") != "") {
            history("/payment");
          } else {
            alerts.show("User not valid");
          }
        } else {
          if (localStorage.getItem("token") != "") {
            history("/patient");
          } else {
            alerts.show("User not valid");
          }
        }
      }
      if (!error && loginValues.role === "doctor") {
        if (localStorage.getItem("token") != "") {
          history("/doctor");
        } else {
          alerts.show("User not valid");
        }
      }
    }
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

  const validate_login = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Google recaptcha
  const [isGoogleValidate, setIsGoogleValidate] = useState(false);
  const onChange = (value) => {
    console.log("Captcha value:", value);
    setIsGoogleValidate(true);
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div className="section-area account-wraper2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-8">
                <div className="appointment-form form-wraper">
                  <div className="logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      role="tabpanel"
                      aria-labelledby="formLogin"
                    >
                      {loading && <Loader /> ? (
                        <div className="ui message success">
                          Logged in successfully
                        </div>
                      ) : (
                        ""
                      )}
                      <form onSubmit={handleLogin}>
                        <div className="form-group">
                          <input
                            type="radio"
                            name="role"
                            value="patient"
                            onChange={handleLoginChange}
                          />{" "}
                          Patient &emsp;
                          <input
                            type="radio"
                            name="role"
                            value="doctor"
                            onChange={handleLoginChange}
                          />{" "}
                          Doctor
                        </div>

                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            onChange={handleLoginChange}
                          />
                          <span className="text-danger">
                            {formErrors.email}
                          </span>
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={handleLoginChange}
                          />
                          <span className="text-danger">
                            {formErrors.password}
                          </span>
                        </div>
                        {/* <div className="form-group">
									   <ReCAPTCHA
											sitekey="6LeXBkkbAAAAACYj7aMH2oWsIIkhpCGvm1LDQX9H"
											onChange={onChange}
										/>
                     disabled={!isGoogleValidate}
									</div> */}
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn mb-30 btn-lg btn-primary w-100"
                          >
                            login
                          </button>
                          <Link to="/forget-password">Forgot Password</Link>
                        </div>
                        <div className="text-center mt-40">
                          <p className="mt-0">Dont have any account?</p>
                          <Link
                            className="btn btn-lg btn-secondary w-100"
                            to="/signup"
                          >
                            Register
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;