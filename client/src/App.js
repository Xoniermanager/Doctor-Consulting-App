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

import { loadUser } from './Actions/User';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';
import JoinMeeting from './components/Meeting/JoinMeeting';

const App = () => {

  const dispatch = useDispatch();
 useEffect(()=>{
   dispatch(loadUser());
   connectWithWebSocket();
 },[dispatch]);

 const {isAuthenticated} = useSelector((state)=>state.user);


  return (
    <>
       <Router>
           <Routes>
             <Route exact path="/video-chat" element={<Dashboard/>} />
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
              <Route exact path="/join-meeting" element={<JoinMeeting />} />
           </Routes>

       </Router>
    </>
  );
};
export default App;