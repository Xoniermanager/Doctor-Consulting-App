import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import PatientSideBar from "../Layout/PatientSideBar";
import { useAlert } from "react-alert";
import { updatePatient, loadUser } from "../../../Actions/User";
import moment from "moment";

const PatientProfile = () => {

  const dispatch = useDispatch();

  const {loading, user} = useSelector((state)=>state.user);

  let dt = moment(new Date()).format('YYYY-MM-DD');

  const diffInMs = Math.abs(new Date() - new Date(user.birthday));
  const age = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 365));
  
  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(true);


  const [detail, setDetail] = useState({name: user.name ? user.name : '', birthday : user.birthday ? user.birthday : '', phone :  user.phone ? user.phone : '', address : user.address ? user.address : '', weight :  user.weight ? user.weight : 0,  height :  user.height ? user.height : 0, bloodgroup : user.bloodgroup ? user.bloodgroup : '', gender : user.gender ? user.gender : 'Male' })

  const handleToSubmit = async(e) =>{
    e.preventDefault();
    await setFormErrors(validate(detail));
   if(Object.keys(formErrors).length === 0 && isSubmit === true){
    await dispatch(updatePatient(user._id, detail, profileImage));
    await dispatch(loadUser());
    handleModalClick();
    }else{
    return false;
    }
  }

  const handleChange = (e) =>{
    setDetail({...detail, [e.target.name]: e.target.value});
  }
  const onInputChange = e => {
    setDetail({...detail, [e.target.name]: e.target.value.replace(/^\S*$/,'')});
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
    const nameRegex = /^[A-Za-z]+$/i;
    const phoneRegex = /^[6789]\d{9}$/i;
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/i;

    if (!values.name) {
      errors.name = "Name is required!";
      setIsSubmit(false); 
    }
    if (!nameRegex.test(values.name)) {
      errors.name = "Name is not valid!";
      setIsSubmit(false); 
    }
   
    if (!phoneRegex.test(values.phone)) {
      errors.phone = "This is not a valid phone number!";
      setIsSubmit(false); 
    }

    if (!values.birthday) {
        errors.birthday = "Birthday is required!";
        setIsSubmit(false); 
    } 
    if (!addressRegex.test(values.address)) {
      errors.address = "Valid address detail!";
      setIsSubmit(false); 
     } 
    
     if (+(values.height) <= 0) {
      errors.height = "Enter valid height!";
      setIsSubmit(false); 
     } 

     if (+(values.weight) <= 0) {
      errors.weight = "Enter valid weight!";
      setIsSubmit(false); 
     } 

    return errors;
  };

  const [profileImage, setProfileImage] = useState({});

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProfileImage({ ...profileImage, avatar: Reader.result });
      }
    };
  };

  const modalRef = useRef(null);
  const handleModalClick = () => {
    modalRef.current.click();
}

  return (
    <>
      <Header title={'Profile'}/>
      <PatientSideBar />
      { loading === true ? <Loader /> : (<div className="content-body">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              {/* <!-- row --> */}
              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <center>
                    <img
                      src={user.profileImage ? user.profileImage.url :  require("../../../images/profile/12.png")}
                      className="img-profile rounded-circle img-fluid"
                    />
                  </center>
                  <h4 className="text-center">
                    <p className="mt-3">{user.name}</p>
                    <label className="badge badge-primary-soft">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        <i className="fa fa-edit"></i>
                      </a>
                    </label>
                  </h4>
                </div>
                <div className="col-md-8 col-sm-8">
                  <p>
                    <b>Age :</b> {moment(user.birthday).format('DD-MM-YYYY')} ({age} Years)
                  </p>
                  <p>
                    <b>Gender :</b> {user.gender}
                  </p>
                  <p>
                    <b>Phone :</b> {user.phone}
                  </p>
                  <p>
                    <b>Address :</b> {user.address}
                  </p>
                  <p>
                    <b>Weight :</b> {user.weight} Kg
                  </p>
                  <p>
                    <b>Height :</b> {user.height} cm
                  </p>
                  <p>
                    <b>Blood Group :</b> {user.bloodgroup}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}

      {/* Modal */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile details</h5>
              <button type="button" ref={modalRef} className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="basic-form">
                <form onSubmit={handleToSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Patient Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="name"
                        onChange={handleChange}
                        value={detail.name}
                        
                      />
                      <span className="text-danger">{formErrors.name}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Birthday </label>
                      <input
                        type="date"
                        className="form-control"
                        value={detail.birthday}
                        name="birthday"
                        max={dt}
                        onChange={handleChange}
                        placeholder=""
                      />
                      <span className="text-danger">{formErrors.birthday}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Phone </label>
                      <input
                        type="number"
                        className="form-control"
                        value={detail.phone}
                        name="phone"
                        pattern="\d*" maxlength="10"
                        onChange={handleChange}
                        placeholder=""
                      />
                       <span className="text-danger">{formErrors.phone}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Gender</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          onChange={handleChange}
                          id="gridRadios1"
                          checked={detail.gender === 'Male'}
                          value='Male'
                        />
                        <label
                          className="form-check-label m-0"
                          for="gridRadios1"
                        >
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          onChange={handleChange}
                          id="gridRadios2"
                          checked={detail.gender === 'Female'}
                          value='Female'
                        />
                        <label
                          className="form-check-labelm-0"
                          for="gridRadios2"
                        >
                          Female
                        </label>
                      </div>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Address</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        name="address"
                        onChange={handleChange}
                        id="comment"
                        value={detail.address}
                      ></textarea>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Weight </label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        name="weight"
                        pattern="[1-9]"
                        value={detail.weight}
                        placeholder="In Kg"
                      />
                      <span className="text-danger">{formErrors.weight}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Height </label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        name="height"
                        value={detail.height}
                        pattern="[1-9]"
                        min={100}
                        placeholder="In cm"
                        required
                      />
                      <span className="text-danger">{formErrors.height}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Blood Group </label>
                      <select name="bloodgroup" value={detail.bloodgroup} onChange={handleChange} className="form-control">
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

                    <div className="form-group col-md-6">
                      <label>Profile Image </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleProfileImage}
                        name="profileImage"
                        accept="image/*"
                        placeholder="Profile Image"
                      />
                    </div>

                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientProfile;
