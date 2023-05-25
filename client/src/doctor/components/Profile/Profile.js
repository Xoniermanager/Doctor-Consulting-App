import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments } from "../../../Actions/Admin";
import { updateDoctorProfile, loadUser, updateDoctorLanguage, updateDoctorExperience, updateClinicAwards } from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import AddRemoveAcad from "./AddRemoveAcad";
import AddRemoveAward from "./AddRemoveAward";
import AddRemoveExp from "./AddRemoveExp";
import AddRemoveLang from "./AddRemoveLang";
import DoctorDetails from "./DoctorDetails";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, user} = useSelector((state)=>state.user);

  const [profileImage, setProfileImage] = useState({});

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

  const [formErrors, setFormErrors] = useState({});

   // profile data update


  //console.log('user',user);

  const intialValue = { name : user && user.name, academic: user && user.academic, specialist : user && user.specialist, about : user && user.about, patientNo: user && user.patientNo, surgery : user && user.surgery, experienceYear : user && user.experienceYear, departmentId : user && user.departmentId, department : user && user.department};
  const [profileValue, setProfileValue] = useState(intialValue);
  const handleChange = (e) =>{
    if(e.target.name === 'departmentId'){
      let index = e.nativeEvent.target.selectedIndex;
      profileValue.departmentId = e.target.value;
      profileValue.department =  e.nativeEvent.target[index].text;
      profileValue.specialist = e.nativeEvent.target[index].text;
      setProfileValue({...profileValue});
    }else{
      setProfileValue({...profileValue, [e.target.name]: e.target.value});
    }
  }
  

  const handleProfileSubmit = async (e) =>{
    e.preventDefault();
    let { name, academic, specialist, departmentId, department, about, patientNo, surgery, experienceYear } = profileValue;
   await setFormErrors(validate(profileValue));
   if(Object.keys(formErrors).length === 0){
   await dispatch(updateDoctorProfile(name, academic, specialist, departmentId, department, about, patientNo, surgery, experienceYear, profileImage));
     handleLanguageClick();
    dispatch(loadUser());
   }
  }
// experience popup
const [expValue, setExpValue] = useState(user && user.experiences ? user.experiences : [{experience:'', expYear:''}]);
 const handleExperienceSubmit = async (e) =>{
   e.preventDefault();
   await dispatch(updateDoctorExperience(expValue));

   //history("/doctor/profile");
   handleExpClick();
   dispatch(loadUser());
   
 }

 // language popup
 const [introVideo,setIntroVideo] = useState(user && user.videoIntroUrl ? user.videoIntroUrl : null)
 const [langValue, setLangValue] = useState(user && user.languages ? user.languages : [{value:null}]);
  const handleLanguageSubmit = async (e) =>{
    e.preventDefault();
    await dispatch(updateDoctorLanguage(introVideo,langValue));
    handleDetailClick();
    dispatch(loadUser());
    
  }
  // academic awards
  const [clinicAddr, setClinicAddr] = useState(user && user.clinic_details ? user.clinic_details : '');
  const [docterAcademic, setDocterAcademic] = useState(user && user.academic_details ? user.academic_details : [{academic : null}]);

  let list = user && user.awards.map((element)=>{
    element = {
      ...element,
      awardImage : element.awardImage.url
    }
    return element;
  })
  const [doctorAward, setDoctorAward] = useState(list ? list : [{awardImage : null, awardName : null}]);
  const handleAccClinicSubmit = async (e) =>{
    e.preventDefault();
    await dispatch(updateClinicAwards(clinicAddr, docterAcademic, doctorAward));
     dispatch(loadUser());
     handleAwardClick();
  }

  const myRefname= useRef(null);
    const handleLanguageClick = () => {
      myRefname.current.click();
  }

  const expModel= useRef(null);
  const handleExpClick = () => {
    expModel.current.click();
  }

  const langModel= useRef(null);
  const handleDetailClick = () => {
    langModel.current.click();
  }

  const awardModel= useRef(null);
  const handleAwardClick = () => {
    awardModel.current.click();
  }

  const handleAboutImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProfileImage({ ...profileImage, avatar: Reader.result });
      }
    };
  };

  let { departments } = useSelector((state) => state.departments);

  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[A-Za-z ]+$/i;
    const numRegex = /^\d+$/i;
    const alphaNumRegex = /^[a-zA-Z0-9\s,'-]*$/i;

    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!nameRegex.test(values.name)) {
      errors.name = "Name is not valid!";
    }
   
    if (!numRegex.test(values.patientNo)) {
      errors.patientNo = "This is not a valid patient number!";
    }
    if (!numRegex.test(values.surgery)) {
      errors.surgery = "This is not a valid surgery number!";
    }
    if (!numRegex.test(values.experienceYear)) {
      errors.experienceYear = "This is not a valid experience number!";
    }

    if (!values.departmentId) {
        errors.departmentId = "Department is required!";

    } 
    if (!values.about) {
      errors.about = "Valid about detail!";
     } 
     if (!alphaNumRegex.test(values.academic)) {
      errors.academic = "Valid academic detail!";
     } 
    return errors;
  };

  useEffect(async() => {
    await dispatch(getDepartments());
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [formErrors, alert, error, dispatch, message]);

 
  
  return (
    <>
      <Header title={'Profile'}/>
      <DoctSideBar />
      { loading === true ? <Loader />  : (<DoctorDetails user={user} />)}
      <Footer />
      <div className="modal fade" id="basicModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile details</h5>
              <button ref={myRefname} type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="basic-form">
                <form onSubmit={handleProfileSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Doctor Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="name"
                        value={profileValue && profileValue.name}
                        onChange={handleChange}
                      />
                      <span className="text-danger">{formErrors.name}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Academic </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="academic"
                        value={profileValue.academic}
                        onChange={handleChange}
                      />
                      <span className="text-danger">{formErrors.academic}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Specialist</label>
                      <select className="form-control" name="departmentId" value={profileValue.departmentId} onChange={handleChange}>
                      <option value="">Select Department</option>
                        { departments && departments.map((depat)=> (
                          <option value={depat._id}>{depat.departmentName}</option>
                          ))}
                    </select>
                    <span className="text-danger">{formErrors.departmentId}</span>
                    </div>
                    <div className="form-group col-md-6">
                      <label>About doctor</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        name="about"
                        value={profileValue.about}
                        onChange={handleChange}
                      ></textarea>
                      <span className="text-danger">{formErrors.about}</span>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Patients</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Patients"
                        name="patientNo"
                        value={profileValue.patientNo}
                        onChange={handleChange}
                      />
                       <span className="text-danger">{formErrors.patientNo}</span>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Surgery</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Surgery"
                        name="surgery"
                        value={profileValue.surgery}
                        onChange={handleChange}
                      />
                       <span className="text-danger">{formErrors.surgery}</span>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Experience</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Experience"
                        name="experienceYear"
                        value={profileValue.experienceYear}
                        onChange={handleChange}
                      />
                       <span className="text-danger">{formErrors.experienceYear}</span>
                    </div>

                  <div className="form-group col-md-6">
                    <label>Profile Image</label>
                    <input
                      type="file"
                      onChange={handleAboutImage}
                      className="form-control"
                      placeholder="Choose Avatar"
                      accept="image/*"
                    />
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
      {/* <!-- Modal --> */}
      <div className="modal fade" id="Experience">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Experience</h5>
              <button type="button" ref={expModel} className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="basic-form">
                  <form onSubmit={handleExperienceSubmit}>
                    <AddRemoveExp expValue={expValue} setExpValue={setExpValue} />
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="Language">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Language</h5>
              <button ref={langModel} type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="basic-form">
                <form onSubmit={handleLanguageSubmit}>
                <AddRemoveLang langValue={langValue} setLangValue={setLangValue}  />
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Add Profile Video </label>
                      <input
                        type="text"
                        className="form-control"
                        name="introVideo"
                        value={introVideo}
                        onChange={(e)=> setIntroVideo(e.target.value)}
                        placeholder=""
                      />
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
      {/* <!-- Modal --> */}
      <div className="modal fade" id="Academic">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Academics</h5>
              <button type="button" className="close" data-dismiss="modal" ref={awardModel}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="basic-form">
                <form onSubmit={handleAccClinicSubmit}>
                  <AddRemoveAcad docterAcademic={docterAcademic} setDocterAcademic={setDocterAcademic} />
                  <AddRemoveAward doctorAward={doctorAward} setDoctorAward={setDoctorAward}/>

                    <div className="form-row">
                     <div className="form-group col-md-12">
                      <label>Add Clinic Details </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        name="clinicAddr"
                        value={clinicAddr}
                        onChange={(e)=> setClinicAddr(e.target.value)}
                      ></textarea>
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
    </>
  );
};

export default Profile;
