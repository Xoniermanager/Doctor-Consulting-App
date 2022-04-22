import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Service from './components/Service';
import Team from './components/Team';
import BookAppointment from './components/BookAppointment';
import ContactUs from './components/ContactUs';
import BlogDetails from './components/BlogDetails';
import ServiceDetail from './components/ServiceDetail';
import AboutUs from './components/AboutUs';
import BlogGrid from './components/BlogGrid';
import Login from './components/Login';

import VideoConference from './components/vchat/VideoConference';
import PatientFeedback from './components/PatientFeedback';
import Pathology from './components/Pathology';

import { loadUser, toggleMenus } from './Actions/User';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';
import JoinMeeting from './components/Meeting/JoinMeeting';
import Signup from './components/Signup';
import Forgetpassword from './components/Forgetpassword';
import ResetPassword from './components/ResetPassword';


// for doctors
import Profile from './doctor/components/Profile/Profile';
import DoctorDashboard from './doctor/components/Dashboard/DoctorDashboard';
import NewPatient from './doctor/components/Patient/NewPatient';
import Patients from './doctor/components/Patient/Patients';
import NewPrescription from './doctor/components/Prescription/NewPrescription';
import Prescriptions from './doctor/components/Prescription/Prescriptions';
import NewDrug from './doctor/components/Drugs/NewDrug';
import Drugs from './doctor/components/Drugs/Drugs';
import NewTest from './doctor/components/Diagnosis/NewTest';
import AllTests from './doctor/components/Diagnosis/AllTests';
import ViewPrescription from './doctor/components/Prescription/ViewPrescription';
import AddSlot from './doctor/components/Appointment/AddSlot';
import AppointmentSlot from './doctor/components/Appointment/AppointmentSlot';
import CreateAppointment from './doctor/components/Appointment/CreateAppointment';
import DateSlot from './doctor/components/Appointment/DateSlot';
import Appointments from './doctor/components/Appointment/Appointments';
import PatientDashboard from './doctor/patient/Dashboard/PatientDashboard';
import PatientProfile from './doctor/patient/PatientProfile/PatientProfile';
import PatientPrescriptions from './doctor/patient/Prescription/PatientPrescriptions';
import CreatePatientAppointment from './doctor/patient/Appointment/CreatePatientAppointment';
import PatientAppointments from './doctor/patient/Appointment/PatientAppointments';
import ChangePassword from './doctor/patient/PatientProfile/ChangePassword';
import ViewPatientPrescription from './doctor/patient/Prescription/ViewPatientPrescription';
import PatientReport from './doctor/patient/Reports/PatientReport';


const App = () => {
 const dispatch = useDispatch();
 useEffect(()=>{
   dispatch(loadUser());
   connectWithWebSocket();
   dispatch(toggleMenus());
 },[dispatch]);

 const {menuToggle} = useSelector((state)=>state.menuToggle);

 const {user} = useSelector((state)=>state.user);
 
  return (
    <div id='main-wrapper' className={`shows ${menuToggle ? menuToggle.isToggle : ''}`}>
       <Router>
           <Routes>
              <Route exact path="/video-chat" element={ user && user.role ==='patient' ? <Dashboard/> : ''} />
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about-us" element={<AboutUs/>} />
              <Route exact path="/team" element={<Team/>} />
              <Route exact path="/patient-feedback" element={<PatientFeedback/>} />
              <Route exact path="/book-appointment" element={<BookAppointment />}  />
              <Route exact path="/services" element={<Service/>} />
              <Route exact path="/service-details" element={<ServiceDetail/>} />
              <Route exact path="/blog-grid" element={<BlogGrid/>} />
              <Route exact path="/blog-details" element={<BlogDetails/>} />
              <Route exact path='/pathology' element={<Pathology/>} />
              <Route exact path="/contact-us" element={<ContactUs/>} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/forget-password" element={<Forgetpassword />} />
              <Route exact path="/reset-password" element={<ResetPassword />} />
              <Route exact path="/join-meeting" element={<JoinMeeting />} />

              {/* for doctors */}
              <Route exact path='/doctor/profile' element={<Profile />} />
              <Route exact path='/doctor' element={ user &&  user.role ==='doctor' ? <DoctorDashboard/> : ''} />
              <Route exact path='/patient/create' element={<NewPatient />} />
              <Route exact path='/patients' element={<Patients />} />

              <Route exact path='/create-prescription' element={<NewPrescription/>} />
              <Route exact path='/edit-prescription/:presId' element={<NewPrescription/>} />
              <Route exact path='/all-prescription' element={ <Prescriptions/>} />
              <Route exact path='/view-prescription/:presId' element= { <ViewPrescription/> } />

              <Route exact path='/create-drug' element={<NewDrug />} />
              <Route exact path='/drug-edit/:drugId' element={<NewDrug />} />
              <Route exact path='/all-drugs' element={<Drugs />} />

              <Route exact path='/create-test' element={<NewTest/>} />
              <Route exact path='/test-edit/:testId' element={<NewTest />} />
              <Route exact path='/all-tests' element={ <AllTests/>} />

              <Route exact path='/create-slot' element={<AddSlot/>} />
              <Route exact path='/my-slots' element={<AppointmentSlot/>} />
              <Route exact path='/edit-slot/:slotId' element={<AddSlot/>} />
              <Route exact path='/date-slot' element={<DateSlot/>} />

              <Route exact path='/create-appointment' element={<CreateAppointment/>} />
              <Route exact path='/doctor-appointments' element={<Appointments/>} />

              {/* Patient module */}
              <Route exact path='/patient' element={ user &&  user.role ==='patient' ? <PatientDashboard/> : ''} />
              <Route exact path='/patient/profile' element={ user &&  user.role ==='patient' ? <PatientProfile/> : ''} />
              <Route exact path='/patient/create-appointment' element={ user &&  user.role ==='patient' ? <CreatePatientAppointment/> : ''} />
              <Route exact path='/patient/appointments' element={ user &&  user.role ==='patient' ? <PatientAppointments/> : ''} />
              <Route exact path='/patient/change-password' element={ user &&  user.role ==='patient' ? <ChangePassword/> : ''} />
              <Route exact path='/patient/all-prescription' element={ user &&  user.role ==='patient' ? <PatientPrescriptions/> : ''} />
              <Route exact path='/patient/view-prescription/:presId' element= {  user &&  user.role ==='patient' ? <ViewPatientPrescription/> : '' } />
              <Route exact path='/patient/reports' element= { user &&  user.role ==='patient' ? <PatientReport/> : '' } />
           </Routes>

       </Router>
    </div>
  );
};
export default App;