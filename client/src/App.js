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
import AllNews from './doctor/admin/News/AllNews';
import AddNews from './doctor/admin/News/AddNews';
import FindDoctors from './doctor/patient/Appointment/FindDoctors';
import UpcommingAppointment from './doctor/patient/Appointment/UpcommingAppointment';
import FollowupAppointment from './doctor/patient/Appointment/FollowupAppointment';
import CompletedAppointment from './doctor/patient/Appointment/CompletedAppointment';
import PatientWiseAppointments from './doctor/components/Appointment/PatientWiseAppointments';
import UpdatePassword from './components/UpdatePassword';
import SetAdminPassword from './doctor/admin/Auth/SetAdminPassword';

const App = () => {
 const dispatch = useDispatch();
 useEffect(async()=>{
  await dispatch(loadUser());
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
              <Route exact path="/set-password" element={<UpdatePassword />} />
              <Route exact path="/reset-password" element={<ResetPassword />} />
              <Route exact path="/join-meeting" element={<JoinMeeting />} />
              <Route exact path="/faqs" element={<Faqs />} />

              {/* for doctors */}
              <Route exact path='/doctor/profile' element={<Profile />} />
              <Route exact path='/doctor' element={ user &&  user.role ==='doctor' ? <DoctorDashboard/> : <Login/>} />
              <Route exact path='/patient/create' element={ user &&  user.role ==='doctor' ? <NewPatient /> : <Login/>} />
              <Route exact path='/patients' element={ user &&  user.role ==='doctor' ? <Patients /> : <Login/>} />

              <Route exact path='/create-prescription/:appId' element={ user &&  user.role ==='doctor' ? <NewPrescription/> : <Login/>} />
              <Route exact path='/edit-prescription/:presId' element={ user &&  user.role ==='doctor' ?<NewPrescription/> : '' } />
              <Route exact path='/all-prescription' element={ user &&  user.role ==='doctor' ? <Prescriptions/> : <Login/>} />
              <Route exact path='/view-prescription/:presId' element= { user &&  user.role ==='doctor' ? <ViewPrescription/> : '' } />

              <Route exact path='/create-drug' element={ user &&  user.role ==='doctor' ? <NewDrug /> : <Login/>} />
              <Route exact path='/drug-edit/:drugId' element={ user &&  user.role ==='doctor' ? <NewDrug /> : <Login/>} />
              <Route exact path='/all-drugs' element={ user &&  user.role ==='doctor' ? <Drugs /> : <Login/>} />

              <Route exact path='/create-test' element={ user &&  user.role ==='doctor' ? <NewTest/> : <Login/>} />
              <Route exact path='/test-edit/:testId' element={ user &&  user.role ==='doctor' ? <NewTest /> : <Login/>} />
              <Route exact path='/all-tests' element={ user &&  user.role ==='doctor' ? <AllTests/> : <Login/>} />

              <Route exact path='/create-slot' element={ user &&  user.role ==='doctor' ? <AddSlot/> : <Login/>} />
              <Route exact path='/my-slots' element={user &&  user.role ==='doctor' ? <AppointmentSlot/> : <Login/>} />
              <Route exact path='/edit-slot/:slotId' element={ user &&  user.role ==='doctor' ? <AddSlot/> : <Login/>} />
              <Route exact path='/date-slot' element={ user &&  user.role ==='doctor' ? <DateSlot/> : <Login/>} />

              <Route exact path='/create-appointment' element={ user &&  user.role ==='doctor' ? <CreateAppointment/> : <Login/>} />
              <Route exact path='/doctor-appointments' element={ user &&  user.role ==='doctor' ? <Appointments/> : <Login/>} />
              <Route exact path='/doctor-patient-appointments/:patientId' element={ user &&  user.role ==='doctor' ? <PatientWiseAppointments/> : <Login/>} />

              {/* Patient module */}
              <Route exact path='/patient' element={ user &&  user.role ==='patient' ? <PatientDashboard/> : <Login/>} />
              <Route exact path='/patient/profile' element={ user &&  user.role ==='patient' ? <PatientProfile/> : <Login/>} />
              <Route exact path='/patient/doctor-list' element={ user &&  user.role ==='patient' ? <FindDoctors/> : <Login/>} />
              <Route exact path='/patient/appointments' element={ user &&  user.role ==='patient' ? <PatientAppointments/> : <Login/>} />
              <Route exact path='/patient/change-password' element={ user &&  user.role ==='patient' ? <ChangePassword/> : <Login/>} />
              <Route exact path='/patient/all-prescription' element={ user &&  user.role ==='patient' ? <PatientPrescriptions/> : <Login/>} />
              <Route exact path='/patient/view-prescription/:presId' element={  user &&  user.role ==='patient' ? <ViewPatientPrescription/> : '' } />
              <Route exact path='/patient/reports' element={ user &&  user.role ==='patient' ? <PatientReport/> : '' } />
              <Route exact path='/patient/create-appointment/:doctId' element={ user &&  user.role ==='patient' ? <CreatePatientAppointment/> : <Login/>} />

              <Route exact path='/patient/upcomming-appointment' element={ user &&  user.role ==='patient' ? <UpcommingAppointment/> : <Login/>} />
              <Route exact path='/patient/completed-appointment' element={ user &&  user.role ==='patient' ? <CompletedAppointment/> : <Login/>} />
              <Route exact path='/patient/followup-appointment' element={ user &&  user.role ==='patient' ? <FollowupAppointment/> : <Login/>} />

               {/* Admin module */}
               <Route exact path="/admin/login" element={<AdminLogin />} />
               <Route exact path="/admin/forget-password" element={<AdminForgetpassword />} />
               <Route exact path="/admin/reset-password" element={<AdminResetPassword />} />
               <Route exact path="/admin/set-password" element={<SetAdminPassword />} />
               <Route exact path="/admin" element={user &&  user.role ==='admin' ? <AdminDashboard /> : <AdminLogin/>} />
               <Route exact path="/admin/patients" element={user &&  user.role ==='admin' ? <AdminPatients />: <AdminLogin/>} />
               <Route exact path="/admin/create-doctor" element={user &&  user.role ==='admin' ? <AddDoctor />: <AdminLogin/>} />

               <Route exact path="/admin/create-drug" element={user &&  user.role ==='admin' ? <AdminNewDrug />: <AdminLogin/>} />
               <Route exact path='/admin/drug-edit/:drugId' element={ user &&  user.role ==='doctor' ? <AdminNewDrug /> : <AdminLogin/>} />
               <Route exact path="/admin/all-drugs" element={user &&  user.role ==='admin' ? <AdminDrugs />: <AdminLogin/>} />

               <Route exact path="/admin/create-test" element={user &&  user.role ==='admin' ? <AdminNewTest />: <AdminLogin/>} />
               <Route exact path="/admin/edit-test/:testId" element={user &&  user.role ==='admin' ? <AdminNewTest />: <AdminLogin/>} />
               <Route exact path="/admin/all-tests" element={user &&  user.role ==='admin' ? <AdminAllTests />: <AdminLogin/>} />
               <Route exact path="/admin/doctors" element={user &&  user.role ==='admin' ? <AdminDoctors />: <AdminLogin/>} />
               <Route exact path="/admin/create-disease" element={user &&  user.role ==='admin' ? <NewDisease />: <AdminLogin/>} />
               <Route exact path="/admin/disease-edit/:diseaseId" element={user &&  user.role ==='admin' ? <NewDisease />: <AdminLogin/>} />
               <Route exact path="/admin/all-diseases" element={user &&  user.role ==='admin' ? <AllDisease />: <AdminLogin/>} />
               <Route exact path="/admin/create-department" element={user &&  user.role ==='admin' ? <NewDepartment />: <AdminLogin/>} />
               <Route exact path="/admin/department-edit/:departmentId" element={user &&  user.role ==='admin' ? <NewDepartment />: <AdminLogin/>} />
               <Route exact path="/admin/all-departments" element={user &&  user.role ==='admin' ? <AllDepartment />: <AdminLogin/>} />
              {/* CMS */}
              <Route exact path="/admin/create-faq" element={user &&  user.role ==='admin' ? <NewFaq />: <AdminLogin/>} />
               <Route exact path="/admin/faq-edit/:faqId" element={user &&  user.role ==='admin' ? <NewFaq />: <AdminLogin/>} />
               <Route exact path="/admin/all-faqs" element={user &&  user.role ==='admin' ? <AllFaqs />: <AdminLogin/>} />

               <Route exact path="/admin/create-news" element={user &&  user.role ==='admin' ? <AddNews />: <AdminLogin/>} />
               <Route exact path="/admin/news-edit/:newsId" element={user &&  user.role ==='admin' ? <AddNews />: <AdminLogin/>} />
               <Route exact path="/admin/all-newses" element={user &&  user.role ==='admin' ? <AllNews />: <AdminLogin/>} />
            </Routes>

       </Router>)}
    </div>
  );
};
export default App;