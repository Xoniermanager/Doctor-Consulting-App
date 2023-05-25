import { configureStore } from '@reduxjs/toolkit';
import { appointmentsReducer,doctorDetailsReducer,doctorMonthlyEarningReducer, paymentDetailsReducer, dateSlotReducer, doctorsReducer,getAllPrescriptionReducer, drugDataReducer, editDataReducer, forgetPasswordReducer, patientAppointmentReducer, patientPrescriptionReducer, patientReportReducer, patientsReducer, prescriptionReducer, slotsReducer, testsReducer, toggleReducer, userReducer, patientDashboardReducer, getSearchDoctorReducer, getUserIdReducer, todayAppointmentsReducer, feeReducer,getBlogDetailsReducer,getDoctorAllSlotReducer,getDoctorAllMonSlotReducer,getDoctorAllTueSlotReducer,PatientPaymentReducer } from './Reducers/User';
import dashboardReducer from './Reducers/dashboardReducer';
import callReducer from './Reducers/callReducer';
import { adminAPIReducer, adminDashboardReducer, adminDataDetailsReducer, adminDepartmentsReducer, adminDiseasesReducer, adminFaqsReducer, adminNewsReducer,adminLatestNewsReducer, adminPatientsReducer, enquiryReducer,adminServiceReducer,adminStoriesReducer,adminClientsReducer,adminEditAboutReducer } from './Reducers/Admin';

const store = configureStore({
    reducer : {
      dashboard : dashboardReducer,
      call : callReducer,
      user : userReducer,
      feeApiStatus: feeReducer,
      patients : patientsReducer,
      drugs : drugDataReducer,
      tests : testsReducer,
      apiStatus : forgetPasswordReducer,
      prescriptions : prescriptionReducer,
      editData : editDataReducer,
      menuToggle : toggleReducer,
      slots : slotsReducer,
      dateSlots : dateSlotReducer,
      doctorAppointments : appointmentsReducer,
      todayDoctorAppointments : todayAppointmentsReducer,
      doctors : doctorsReducer,
      patientAppointments : patientAppointmentReducer,
      patientAllPrescription : patientPrescriptionReducer,
      patientReports : patientReportReducer,
      patientDashBoard : patientDashboardReducer,
      doctorDetails : doctorDetailsReducer,
      paymentDetails:paymentDetailsReducer,
      doctorMonthlyEarning: doctorMonthlyEarningReducer,
      allPrescriptions: getAllPrescriptionReducer,
      blogdetails : getBlogDetailsReducer,
      allSlots : getDoctorAllSlotReducer,
      allmonslots : getDoctorAllMonSlotReducer,
      alltueslots : getDoctorAllTueSlotReducer,
      // admin 
      adminApiStatus : adminAPIReducer, 
      service : adminServiceReducer,
      aboutDetails : adminEditAboutReducer,
      patientPayment : PatientPaymentReducer,
      // editservicess : adminServiceEditReducer,
      adminPatients : adminPatientsReducer,
      stories:adminStoriesReducer,
      clients:adminClientsReducer,
      dataDetails : adminDataDetailsReducer,
      diseases : adminDiseasesReducer,
      departments : adminDepartmentsReducer,
      faqs : adminFaqsReducer,
      newses : adminNewsReducer,
      latestnewses : adminLatestNewsReducer,
      enquiries : enquiryReducer,
      searchDoctors : getSearchDoctorReducer,
      userIdForPassword : getUserIdReducer,
      dashboardData : adminDashboardReducer
    }
})

export default store;