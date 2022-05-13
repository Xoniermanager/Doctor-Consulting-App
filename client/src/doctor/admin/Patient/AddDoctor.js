import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../Layout/SideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import { createDoctor, getDepartments } from "../../../Actions/Admin";

const AddDoctor = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  let { departments } = useSelector((state) => state.departments);


  const initialValue = {
    name: "",
    email: "",
    gender: "",
    department : "",
    departmentId : "",
    academic: "",
    about: "",
    address: "",
    isVerify: 1,
    role: "doctor",
    status: 1,
  };
  const [userValue, setUserValue] = useState(initialValue);

  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [certificate, setCertificate] = useState("");

  const handleOnChange = (e) => {
    if(e.target.name == 'department'){
      let index = e.nativeEvent.target.selectedIndex;
      userValue.departmentId = e.target.value;
      userValue.department =  e.nativeEvent.target[index].text;
      userValue.specialist =  e.nativeEvent.target[index].text;
    }else{
      setUserValue({ ...userValue, [e.target.name]: e.target.value });
    }
  };

  const handleToSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(userValue));
    setIsSubmit(true);
    await dispatch(createDoctor(userValue, certificate));
    if (!error && Object.keys(formErrors).length === 0) {
      history("/admin/doctors");
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
    if (!values.department) {
      errors.department = "Department is required!";
    }
    if (!values.academic) {
      errors.academic = "Academic is required!";
    }
    if (!values.about) {
      errors.about = "About is required!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
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
      <Header title={"Add Doctor"} />
      <SideBar />
      {loading === true ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container-fluid">
            {/* <!-- row --> */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h4 className="text-primary">New Doctor</h4>
                  </div>
                  <div className="card-body">
                    {error === "" && isSubmit ? (
                      <div className="ui message success">
                        Doctor created successfully
                      </div>
                    ) : (
                      ""
                    )}
                    <form onSubmit={handleToSubmit} autoComplete="off">
                      <div className="form-group row">
                        <label for="Name" className="col-sm-12 col-form-label">
                          Full Name<font color="red">*</font>
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            onChange={handleOnChange}
                            name="name"
                            className="form-control"
                          />
                        </div>
                        <span className="text-danger">{formErrors.name}</span>
                      </div>

                      <div className="form-group row">
                        <label for="email" className="col-sm-12 col-form-label">
                          Email<font color="red">*</font>
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="email"
                            onChange={handleOnChange}
                            name="email"
                            className="form-control"
                          />
                        </div>
                        <span className="text-danger">{formErrors.email}</span>
                      </div>

                      <div className="form-group row">
                        <label
                          for="department"
                          className="col-sm-12 col-form-label"
                        > Department<font color="red">*</font>
                        </label>
                        <div className="col-sm-12">
                          <select
                            name="department"
                            onChange={handleOnChange}
                            className="form-control"
                          >
                          <option value="">Select Department</option>
                          { departments && departments.map((depat)=> (
                            <option value={depat._id}>{depat.departmentName}</option>
                            ))}
                          </select>
                        </div>
                        <span className="text-danger">{formErrors.department}</span>
                      </div>

                      <div className="form-group row">
                        <label
                          for="Gender"
                          className="col-sm-12 col-form-label"
                        > Gender<font color="red">*</font>
                        </label>
                        <div className="col-sm-12">
                          <select
                            name="gender"
                            onChange={handleOnChange}
                            className="form-control"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          for="academic"
                          className="col-sm-12 col-form-label"
                        > Academic</label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            onChange={handleOnChange}
                            name="academic"
                            className="form-control"
                          />
                        </div>
                        <span className="text-danger">{formErrors.academic}</span>
                      </div>
                      <div className="form-group row">
                        <label
                          for="address"
                          className="col-sm-12 col-form-label"
                        >Clinic Address</label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            onChange={handleOnChange}
                            name="address"
                            className="form-control"
                          />
                        </div>
                        <span className="text-danger">{formErrors.address}</span>
                      </div>

                      <div className="form-group row">
                        <label for="c" className="col-sm-12 col-form-label">
                          About<font color="red">*</font>
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            onChange={handleOnChange}
                            name="about"
                            className="form-control"
                          />
                        </div>
                        <span className="text-danger">{formErrors.about}</span>
                      </div>

                      <div className="form-group row">
                        <label for="certificate" className="col-sm-12 col-form-label">
                          Certificate<font color="red">*</font>
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="file"
                            className="form-control"
                            placeholder="MCI Certificate Upload"
                            name="certificate"
                            accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                            onChange={handleCertificationChange}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-12">
                          <button className="btn btn-primary">Save</button>
                        </div>
                      </div>
                    </form>
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

export default AddDoctor;
