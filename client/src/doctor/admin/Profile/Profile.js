import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDoctorProfile, loadUser, updateDoctorLanguage, updateDoctorExperience, updateClinicAwards } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import SideBar from "../Layout/SideBar";
import AddRemoveAcad from "./AddRemoveAcad";
import AddRemoveAward from "./AddRemoveAward";
import AddRemoveExp from "./AddRemoveExp";
import AddRemoveLang from "./AddRemoveLang";
import DoctorDetails from "./DoctorDetails";

const Profile = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user);

  const [profileImage, setProfileImage] = useState({});

   // profile data update
  const intialValue = { name : user.name, academic: user.academic, specialist : user.specialist, about : user.about};
  const [profileValue, setProfileValue] = useState(intialValue);
  const handleChange = (e) =>{
    setProfileValue({...profileValue, [e.target.name]: e.target.value});
  }
  const handleProfileSubmit = async (e) =>{
    e.preventDefault();
    let { name, academic, specialist, about } = profileValue;
   await dispatch(updateDoctorProfile(name, academic, specialist, about, profileImage));
    dispatch(loadUser());
    handleLanguageClick();
  }
// experience popup
const [expValue, setExpValue] = useState(user.experiences?user.experiences : [{experience:'', expYear:''}]);
 const handleExperienceSubmit = async (e) =>{
   e.preventDefault();
   await dispatch(updateDoctorExperience(expValue));
   dispatch(loadUser());
   handleExpClick();
 }

 // language popup
 const [introVideo,setIntroVideo] = useState(user.videoIntroUrl ? user.videoIntroUrl : null)
 const [langValue, setLangValue] = useState(user.languages ? user.languages : [{value:null}]);
  const handleLanguageSubmit = async (e) =>{
    e.preventDefault();
    await dispatch(updateDoctorLanguage(introVideo,langValue));
    dispatch(loadUser());
    handleDetailClick();
  }
  // academic awards
  const [clinicAddr, setClinicAddr] = useState(user.clinic_details ? user.clinic_details : '');
  const [docterAcademic, setDocterAcademic] = useState(user.academic_details ? user.academic_details : [{academic : null}]);

  let list = user.awards && user.awards.map((element)=>{
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
  
  return (
    <>
      <Header />
      <SideBar />
      <DoctorDetails user={user} />
      <Footer />
      {/* <!-- Modal --> */}
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
                        value={profileValue.name}
                        onChange={handleChange}
                      />
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
                    </div>
                    <div className="form-group col-md-6">
                      <label>Specialist</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="specialist"
                        value={profileValue.specialist}
                        onChange={handleChange}
                      />
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
                    </div>

                  <div className="form-group col-md-6">
                    <label>Prifile Image</label>
                    <input
                      type="file"
                      onChange={handleAboutImage}
                      className="adminPanelFileUpload"
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
