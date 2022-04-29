import { configureStore } from '@reduxjs/toolkit';
import { appointmentsReducer, dateSlotReducer, doctorsReducer, drugDataReducer, editDataReducer, forgetPasswordReducer, patientAppointmentReducer, patientPrescriptionReducer, patientReportReducer, patientsReducer, prescriptionReducer, slotsReducer, testsReducer, toggleReducer, userReducer, patientDashboardReducer } from './Reducers/User';
import dashboardReducer from './Reducers/dashboardReducer';
import callReducer from './Reducers/callReducer';
import { adminAPIReducer, adminDataDetailsReducer, adminDepartmentsReducer, adminDiseasesReducer, adminPatientsReducer } from './Reducers/Admin';

const store = configureStore({
    reducer : {
      dashboard : dashboardReducer,
      call : callReducer,
      user : userReducer,
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
      doctors : doctorsReducer,
      patientAppointments : patientAppointmentReducer,
      patientAllPrescription : patientPrescriptionReducer,
      patientReports : patientReportReducer,
      patientDashBoard : patientDashboardReducer,
      // admin 
      adminApiStatus : adminAPIReducer,
      adminPatients : adminPatientsReducer,
      dataDetails : adminDataDetailsReducer,
      diseases : adminDiseasesReducer,
      departments : adminDepartmentsReducer
    }
})

export default store;