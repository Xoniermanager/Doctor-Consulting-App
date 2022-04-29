import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPatient } from '../../../Actions/User'
import DoctSideBar from '../Layout/DoctSideBar'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Loader from '../Layout/Loader'

const NewPatient = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const initialValue = { name : '', email : '', birthday : '', phone : '', gender:'', bloodgroup : '', address : '', weight :'', height : '', isVerify:1, role:'patient' };
  const [userValue, setUserValue] = useState(initialValue);

  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOnChange = (e) =>{
    setUserValue({...userValue, [e.target.name] : e.target.value});
  }

  const handleToSubmit = async(e) =>{
    e.preventDefault();
    setFormErrors(validate(userValue));
    setIsSubmit(true);
    await dispatch(createPatient(userValue));
    if(!error){
      history('/patients');
    }
  }

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

    if (!values.birthday) {
        errors.birthday = "Birthday is required!";
      } 
    return errors;
  };

  return (
    <>
      <Header title={'Add Patient'}/>
      <DoctSideBar />
         { loading === true ? <Loader /> : (<div className="content-body">
                <div className="container-fluid">
                    {/* <!-- row --> */}
                    <div className="row">
                        <div className="col-lg-12">
                           <div className="card shadow mb-4">
                            <div className="card-header py-3"> 
                               <h4 className="text-primary">New Patient</h4></div>
                               <div className="card-body">
                               {error === "" && isSubmit ? (
                                <div className="ui message success">
                                    Patient created successfully
                                </div>
                                ) : (
                                ""
                                )}
                                <form onSubmit={handleToSubmit} autoComplete="off">
                                    <div className="form-group row">
                                        <label for="Name" className="col-sm-12 col-form-label">Full Name<font color="red">*</font></label>
                                        <div className="col-sm-12"><input type="text" onChange={handleOnChange} name="name" className="form-control" /> </div>
                                        <span className="text-danger">{formErrors.name}</span>
                                    </div>
                                    <div className="form-group row">
                                        <label for="Email" className="col-sm-12 col-form-label">Email Adress<font color="red">*</font></label>
                                        <div className="col-sm-12"><input type="text" onChange={handleOnChange} name="email" className="form-control" /></div>
                                        <span className="text-danger">{formErrors.email}</span>
                                    </div>
                                    <div className="form-group row">
                                        <label for="birthday" className="col-sm-12 col-form-label">Birthday<font color="red">*</font></label>
                                        <div className="col-sm-12"><input type="date" onChange={handleOnChange} name="birthday" autocomplete="off" className="form-control" /></div>
                                        <span className="text-danger">{formErrors.birthday}</span>
                                    </div>
                                    <div className="form-group row">
                                        <label for="Phone" className="col-sm-12 col-form-label">Phone</label>
                                        <div className="col-sm-12"><input type="text" onChange={handleOnChange} name="phone" className="form-control" /></div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="Gender" className="col-sm-12 col-form-label">Gender<font color="red">*</font></label>
                                        <div className="col-sm-12">
                                            <select name="gender" onChange={handleOnChange} className="form-control">
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="Blood" className="col-sm-12 col-form-label">Blood Group</label>
                                        <div className="col-sm-12">
                                            <select name="bloodgroup" onChange={handleOnChange} className="form-control">
                                                <option value="Unknown">Unknown</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="Address" className="col-sm-12 col-form-label">Address</label>
                                        <div className="col-sm-12"><input type="text" onChange={handleOnChange} name="address" className="form-control" /></div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="weight" className="col-sm-12 col-form-label">Patient Weight</label>
                                        <div className="col-sm-12">
                                            <div className="input-group mb-2">
                                                <input type="text" onChange={handleOnChange} name="weight" className="form-control" />
                                                <div className="input-group-prepend"><div className="input-group-text">Kg</div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="Height" className="col-sm-12 col-form-label">Patient Height</label>
                                        <div className="col-sm-12">
                                            <div className="input-group mb-2">
                                                <input type="text" name="height" className="form-control" onChange={handleOnChange} />
                                                <div className="input-group-prepend"><div className="input-group-text">Cm</div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12"><button className="btn btn-primary">Save</button></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>                      
                </div>
            </div>
        </div>)}
     <Footer/>
    </>
  )
}

export default NewPatient