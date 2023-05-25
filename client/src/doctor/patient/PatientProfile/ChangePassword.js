import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import PatientSideBar from "../Layout/PatientSideBar";

const ChangePassword = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
 
  const initialValue = { oldPassword: "", newPassword: "", conPassword: "" };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const {loading, error, message } = useSelector((state) => state.apiStatus);
  const alerts = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    let { oldPassword, newPassword } = formValues;

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!formValues.oldPassword) {
      //alerts.show("Old password is required");
    }else if (!passwordRegex.test(formValues.newPassword)) {
      //alerts.show("Password should be alpha-numeric and min 6 characters");
    }else if (formValues.newPassword !== formValues.conPassword) {
      //alerts.show("Password and confirm password should be matched.");
    }else if (formValues.oldPassword === formValues.newPassword && formValues.newPassword!=='') {
      //alerts.show("New Password is not same as the old one.");
    }else{
      await dispatch(updatePassword(oldPassword, newPassword));
   
      if(!error){
        history('/patient');
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

  const validate = (values) => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!values.oldPassword) {
      errors.oldPassword = "Old password is required";
    }
    if (!passwordRegex.test(values.newPassword)) {
      errors.newPassword = "Password should be alpha-numeric and min 6 characters";
    }
    if (values.newPassword !== values.conPassword) {
      errors.conPassword = "Password and confirm password should be matched.";
    }
    if (values.oldPassword === values.newPassword && values.newPassword!=='') {
      errors.newPassword = "New Password is not same as the old one.";
    }
    return errors;
  };

  return (
    <>
      <Header title={'Change Password'}/>
      <PatientSideBar />
      {loading === true ? <Loader /> : (<div className="content-body">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h4 className="text-primary">Change Password</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                              <label for="">Old Password </label>
                              <input
                                type="password"
                                onChange={handleOnChange}
                                className="form-control"
                                placeholder="Old Password"
                                value={formValues.oldPassword}
                                name="oldPassword"
                              />
                              <span className="text-danger">
                                {formErrors.oldPassword}
                              </span>
                            </div>

                            <div className="form-group">
                              <label for="">New Password </label>
                              <input
                                type="password"
                                className="form-control"
                                onChange={handleOnChange}
                                placeholder="New Password"
                                value={formValues.newPassword}
                                name="newPassword"
                              />
                              <span className="text-danger">
                                {formErrors.newPassword}
                              </span>
                            </div>
                            <div className="form-group">
                              <label for="">Confirm Password</label>
                              <input
                                type="password"
                                className="form-control"
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                value={formValues.conPassword}
                                name="conPassword"
                              />
                              <span className="text-danger">
                                {formErrors.conPassword}
                              </span>
                            </div>

                            <button className="btn btn-primary mt-3">
                              Change Password
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
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

export default ChangePassword;
