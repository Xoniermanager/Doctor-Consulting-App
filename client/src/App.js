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
import PatientFeedback from './components/PatientFeedback';
import Pathology from './components/Pathology';

import { loadUser, toggleMenus } from './Actions/User';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
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
import Error404 from './components/Error404/Error404';

import AdminLogin from './doctor/admin/Auth/AdminLogin';
import AdminForgetpassword from './doctor/admin/Auth/AdminForgetpassword';
import AdminResetPassword from './doctor/admin/Auth/AdminResetPassword';
import AdminDashboard from './doctor/admin/Dashboard/AdminDashboard';
import AdminPatients from './doctor/admin/Patient/AdminPatients';
import AdminAllTests from './doctor/admin/Diagnosis/AdminAllTests';
import AdminDrugs from './doctor/admin/Drugs/AdminDrugs';
import AdminDoctors from './doctor/admin/Patient/AdminDoctors';
import AdminNewDrug from './doctor/admin/Drugs/AdminNewDrug';
import AdminNewTest from './doctor/admin/Diagnosis/AdminNewTest';
import NewDisease from './doctor/admin/Disease/NewDisease';
import AllDisease from './doctor/admin/Disease/AllDisease';
import Loader from './components/Loader';
import NewDepartment from './doctor/admin/Department/NewDepartment';
import AllDepartment from './doctor/admin/Department/AllDepartment';
import AddDoctor from './doctor/admin/Patient/AddDoctor';
import Faqs from './components/Faqs';
import NewFaq from './doctor/admin/Faq/NewFaq';
import AllFaqs from './doctor/admin/Faq/AllFaqs';

const App = () => {
 const dispatch = useDispatch();
 useEffect(()=>{
   dispatch(loadUser());
   connectWithWebSocket();
   dispatch(toggleMenus());
 },[dispatch]);

 const {menuToggle} = useSelector((state)=>state.menuToggle);

 const { loading, user} = useSelector((state)=>state.user);
 
  return (
    <div id='main-wrapper' className={`shows ${menuToggle ? menuToggle.isToggle : ''}`}>
     {loading === true ? <Loader /> : (<Router>
           <Routes>
              <Route path="*" element={<Error404 />} />
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
              <Route exact path="/faqs" element={<Faqs />} />

              {/* for doctors */}
              <Route exact path='/doctor/profile' element={<Profile />} />
              <Route exact path='/doctor' element={ user &&  user.role ==='doctor' ? <DoctorDashboard/> : ''} />
              <Route exact path='/patient/create' element={ user &&  user.role ==='doctor' ? <NewPatient /> : ''} />
              <Route exact path='/patients' element={ user &&  user.role ==='doctor' ? <Patients /> : ''} />

              <Route exact path='/create-prescription' element={ user &&  user.role ==='doctor' ? <NewPrescription/> : ''} />
              <Route exact path='/edit-prescription/:presId' element={ user &&  user.role ==='doctor' ?<NewPrescription/> : '' } />
              <Route exact path='/all-prescription' element={ user &&  user.role ==='doctor' ? <Prescriptions/> : ''} />
              <Route exact path='/view-prescription/:presId' element= { user &&  user.role ==='doctor' ? <ViewPrescription/> : '' } />

              <Route exact path='/create-drug' element={ user &&  user.role ==='doctor' ? <NewDrug /> : ''} />
              <Route exact path='/drug-edit/:drugId' element={ user &&  user.role ==='doctor' ? <NewDrug /> : ''} />
              <Route exact path='/all-drugs' element={ user &&  user.role ==='doctor' ? <Drugs /> : ''} />

              <Route exact path='/create-test' element={ user &&  user.role ==='doctor' ? <NewTest/> : ''} />
              <Route exact path='/test-edit/:testId' element={ user &&  user.role ==='doctor' ? <NewTest /> : ''} />
              <Route exact path='/all-tests' element={ user &&  user.role ==='doctor' ? <AllTests/> : ''} />

              <Route exact path='/create-slot' element={ user &&  user.role ==='doctor' ? <AddSlot/> : ''} />
              <Route exact path='/my-slots' element={user &&  user.role ==='doctor' ? <AppointmentSlot/> : ''} />
              <Route exact path='/edit-slot/:slotId' element={ user &&  user.role ==='doctor' ? <AddSlot/> : ''} />
              <Route exact path='/date-slot' element={ user &&  user.role ==='doctor' ? <DateSlot/> : ''} />

              <Route exact path='/create-appointment' element={ user &&  user.role ==='doctor' ? <CreateAppointment/> : ''} />
              <Route exact path='/doctor-appointments' element={ user &&  user.role ==='doctor' ? <Appointments/> : ''} />

              {/* Patient module */}
              <Route exact path='/patient' element={ user &&  user.role ==='patient' ? <PatientDashboard/> : ''} />
              <Route exact path='/patient/profile' element={ user &&  user.role ==='patient' ? <PatientProfile/> : ''} />
              <Route exact path='/patient/create-appointment' element={ user &&  user.role ==='patient' ? <CreatePatientAppointment/> : ''} />
              <Route exact path='/patient/appointments' element={ user &&  user.role ==='patient' ? <PatientAppointments/> : ''} />
              <Route exact path='/patient/change-password' element={ user &&  user.role ==='patient' ? <ChangePassword/> : ''} />
              <Route exact path='/patient/all-prescription' element={ user &&  user.role ==='patient' ? <PatientPrescriptions/> : ''} />
              <Route exact path='/patient/view-prescription/:presId' element={  user &&  user.role ==='patient' ? <ViewPatientPrescription/> : '' } />
              <Route exact path='/patient/reports' element={ user &&  user.role ==='patient' ? <PatientReport/> : '' } />

               {/* Admin module */}
               <Route exact path="/admin/login" element={<AdminLogin />} />
               <Route exact path="/admin/forget-password" element={<AdminForgetpassword />} />
               <Route exact path="/admin/reset-password" element={<AdminResetPassword />} />
               <Route exact path="/admin" element={user &&  user.role ==='admin' ? <AdminDashboard /> : ''} />
               <Route exact path="/admin/patients" element={user &&  user.role ==='admin' ? <AdminPatients />: ''} />
               <Route exact path="/admin/create-doctor" element={user &&  user.role ==='admin' ? <AddDoctor />: ''} />

               <Route exact path="/admin/create-drug" element={user &&  user.role ==='admin' ? <AdminNewDrug />: ''} />
               <Route exact path='/admin/drug-edit/:drugId' element={ user &&  user.role ==='doctor' ? <AdminNewDrug /> : ''} />
               <Route exact path="/admin/all-drugs" element={user &&  user.role ==='admin' ? <AdminDrugs />: ''} />

               <Route exact path="/admin/create-test" element={user &&  user.role ==='admin' ? <AdminNewTest />: ''} />
               <Route exact path="/admin/edit-test/:testId" element={user &&  user.role ==='admin' ? <AdminNewTest />: ''} />
               <Route exact path="/admin/all-tests" element={user &&  user.role ==='admin' ? <AdminAllTests />: ''} />
               <Route exact path="/admin/doctors" element={user &&  user.role ==='admin' ? <AdminDoctors />: ''} />
               <Route exact path="/admin/create-disease" element={user &&  user.role ==='admin' ? <NewDisease />: ''} />
               <Route exact path="/admin/disease-edit/:diseaseId" element={user &&  user.role ==='admin' ? <NewDisease />: ''} />
               <Route exact path="/admin/all-diseases" element={user &&  user.role ==='admin' ? <AllDisease />: ''} />
               <Route exact path="/admin/create-department" element={user &&  user.role ==='admin' ? <NewDepartment />: ''} />
               <Route exact path="/admin/department-edit/:departmentId" element={user &&  user.role ==='admin' ? <NewDepartment />: ''} />
               <Route exact path="/admin/all-departments" element={user &&  user.role ==='admin' ? <AllDepartment />: ''} />
              {/* CMS */}
              <Route exact path="/admin/create-faq" element={user &&  user.role ==='admin' ? <NewFaq />: ''} />
               <Route exact path="/admin/faq-edit/:faqId" element={user &&  user.role ==='admin' ? <NewFaq />: ''} />
               <Route exact path="/admin/all-faqs" element={user &&  user.role ==='admin' ? <AllFaqs />: ''} />
            </Routes>

       </Router>)}
    </div>
  );
};
export default App;