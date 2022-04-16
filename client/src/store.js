import { configureStore } from '@reduxjs/toolkit';
import { appointmentsReducer, dateSlotReducer, drugDataReducer, editDataReducer, forgetPasswordReducer, patientsReducer, prescriptionReducer, slotsReducer, testsReducer, toggleReducer, userReducer } from './Reducers/User';
import dashboardReducer from './Reducers/dashboardReducer';
import callReducer from './Reducers/callReducer';

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
      doctorAppointments : appointmentsReducer
    }
})

export default store;