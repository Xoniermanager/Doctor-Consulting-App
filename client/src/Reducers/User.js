import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const userReducer = createReducer(initialState,{
    LoginRequest : (state) =>{
        state.loading = true;
    },
    LoginSuccess : (state, action) =>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticate  = true;
    },
    LoginFailure : (state, action) =>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
})

export const getBlogDetailsReducer = createReducer(initialState, {
  GetBlogDetailsRequest: (state) => {
    state.loading = true;
  },
  GetBlogDetailsSuccess: (state, action) => {
    state.loading = false;
    state.blogdetails = action.payload;
  },
  GetBlogDetailsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const getDoctorAllSlotReducer = createReducer(initialState, {
  GetDoctorSlotsByIdRequest: (state) => {
    state.loading = true;
  },
  GetDoctorSlotsByIdSuccess: (state, action) => {
    state.loading = false;
    state.allSlots = action.payload;
  },
  GetDoctorSlotsByIdFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const getDoctorAllMonSlotReducer = createReducer(initialState, {
  getMondaySlotRequest: (state) => {
    state.loading = true;
  },
  getMondaySlotSuccess: (state, action) => {
    state.loading = false;
    state.allmonslots = action.payload;
  },
  getMondaySlotFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
export const getDoctorAllTueSlotReducer = createReducer(initialState, {
  getTuesdaySlotRequest: (state) => {
    state.loading = true;
  },
  getTuesdaySlotSuccess: (state, action) => {
    state.loading = false;
    state.alltueslots = action.payload;
  },
  getTuesdaySlotFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const forgetPasswordReducer = createReducer(initialState, {
  EnquiryRequest : (state) =>{
    state.loading = true;
  },
  
  EnquirySuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  EnquiryFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  RegisterRequest : (state) =>{
    state.loading = true;
  },
  RegisterSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  RegisterFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  ForgetPasswordRequest: (state) => {
    state.loading = true;
  },
  ForgetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  ForgetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ResetPasswordRequest: (state) => {
    state.loading = true;
  },
  ResetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  ResetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateDoctorExperienceRequest: (state) => {
    state.loading = true;
  },
  UpdateDoctorExperienceSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateDoctorExperienceFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateDoctorLanguageRequest: (state) => {
    state.loading = true;
  },
  UpdateDoctorLanguageSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateDoctorLanguageFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateDoctorClinicAwardRequest: (state) => {
    state.loading = true;
  },
  UpdateDoctorClinicAwardSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateDoctorClinicAwardFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreatePatientRequest: (state) => {
    state.loading = true;
  },
  CreatePatientSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreatePatientFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdatePatientRequest: (state) => {
    state.loading = true;
  },
  UpdatePatientSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdatePatientFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreateDrugRequest : (state) =>{
    state.loading = true;
  },
  CreateDrugSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  CreateDrugFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  CreateTestRequest : (state) =>{
    state.loading = true;
  },
  CreateTestSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  CreateTestFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  UpdateDrugRequest : (state) =>{
    state.loading = true;
  },
  UpdateDrugSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  UpdateDrugFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  UpdateTestRequest : (state) =>{
    state.loading = true;
  },
  UpdateTestSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  UpdateTestFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  }, 
  createPrescriptionRequest : (state) =>{
    state.loading = true;
  },
  createPrescriptionSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  createPrescriptionFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  UpdatePrescriptionRequest : (state) =>{
    state.loading = true;
  },
  UpdatePrescriptionSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  UpdatePrescriptionFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  DeletePrescriptionRequest : (state) =>{
    state.loading = true;
  },
  DeletePrescriptionSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  DeletePrescriptionFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  CreateSlotRequest : (state) =>{
    state.loading = true;
  },
  CreateSlotSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  CreateSlotFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  UpdateSlotRequest : (state) =>{
    state.loading = true;
  },
  UpdateSlotSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  UpdateSlotFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  DeleteSlotRequest : (state) =>{
    state.loading = true;
  },
  DeleteSlotSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  DeleteSlotFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  CreateAppointmentRequest : (state) =>{
    state.loading = true;
  },
  CreateAppointmentSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  CreateAppointmentFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  DeleteAppointmentRequest : (state) =>{
    state.loading = true;
  },
  DeleteAppointmentSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  DeleteAppointmentFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  CreateReportRequest : (state) =>{
    state.loading = true;
  },
  CreateReportSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  CreateReportFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  SubmitTestReportRequest : (state) =>{
    state.loading = true;
  },
  SubmitTestReportSuccess : (state, action) =>{
      state.loading = false;
      state.message = action.payload;
  },
  SubmitTestReportFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const patientsReducer = createReducer(initialState, {
  GetPatientRequest : (state) =>{
      state.loading = true;
  },
  GetPatientSuccess : (state, action) =>{
      state.loading = false;
      state.patients = action.payload;
  },
  GetPatientFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const doctorDetailsReducer = createReducer(initialState, {
  GetUsersDetailsRequest : (state) =>{
      state.loading = true;
  },
  GetUsersDetailsSuccess : (state, action) =>{
      state.loading = false;
      state.doctorDetails = action.payload;
  },
  GetUsersDetailsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});



export const paymentDetailsReducer = createReducer(initialState, {
  GetUsersPaymentRequest : (state) =>{
      state.loading = true;
  },
  GetUsersPaymentSuccess : (state, action) =>{
      state.loading = false;
      state.paymentDetails = action.payload;
  },
  GetUsersPaymentFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});


export const PatientPaymentReducer = createReducer(initialState, {
  GetPatientPaymentRequest : (state) =>{
      state.loading = true;
  },
  GetPatientPaymentSuccess : (state, action) =>{
      state.loading = false;
      state.patientPayment = action.payload;
  },
  GetPatientPaymentFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
export const doctorMonthlyEarningReducer = createReducer(initialState, {
  GetDoctorMonthlyEarningRequest : (state) =>{
      state.loading = true;
  },
  GetDoctorMonthlyEarningSuccess : (state, action) =>{
      state.loading = false;
      state.doctorMonthlyEarning = action.payload;
  },
  GetDoctorMonthlyEarningFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const drugDataReducer = createReducer(initialState, {
  GetDrugsRequest : (state) =>{
      state.loading = true;
  },
  GetDrugsSuccess : (state, action) =>{
      state.loading = false;
      state.drugs = action.payload;
  },
  GetDrugsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
})


export const testsReducer = createReducer(initialState, {
  GetTestsRequest : (state) =>{
    state.loading = true;
},
  GetTestsSuccess : (state, action) =>{
      state.loading = false;
      state.tests = action.payload;
  },
  GetTestsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});


export const prescriptionReducer = createReducer(initialState, {
  GetPrescriptionRequest : (state) => {
    state.loading = true;
  },
  GetPrescriptionSuccess : (state, action) =>{
    state.loading = false;
    state.prescriptions = action.payload;
  },
  GetPrescriptionFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const getAllPrescriptionReducer = createReducer(initialState, {
  GetAllPrescriptionRequest : (state) => {
    state.loading = true;
  },
  GetAllPrescriptionSuccess : (state, action) =>{
    state.loading = false;
    state.allPrescriptions = action.payload;
  },
  GetAllPrescriptionFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});


export const editDataReducer = createReducer(initialState, {
  EditDrugRequest : (state) =>{
      state.loading = true;
  },
  EditDrugSuccess : (state, action) =>{
      state.loading = false;
      state.editData = action.payload;
  },
  EditDrugFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  EditTestRequest : (state) =>{
    state.loading = true;
  },
  EditTestSuccess : (state, action) =>{
      state.loading = false;
      state.editData = action.payload;
  },
  EditTestFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  EditPrescriptionRequest : (state) =>{
    state.loading = true;
  },
  EditPrescriptionSuccess : (state, action) =>{
      state.loading = false;
      state.editData = action.payload;
  },
  EditPrescriptionFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  EditSlotRequest : (state) =>{
    state.loading = true;
  },
  EditSlotSuccess : (state, action) =>{
      state.loading = false;
      state.editData = action.payload;
  },
  EditSlotFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  AppointmentDetailsByIdRequest : (state) =>{
    state.loading = true;
  },
  AppointmentDetailsByIdSuccess : (state, action) =>{
      state.loading = false;
      state.editData = action.payload;
  },
  AppointmentDetailsByIdFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  GetPatientPrescriptionByIdRequest : (state) =>{
    state.loading = true;
  },
  GetPatientPrescriptionByIdSuccess : (state, action) =>{
      state.loading = false;
      state.editData = action.payload;
  },
  GetPatientPrescriptionByIdFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  GetUserDetailsRequest : (state) =>{
    state.loading = true;
  },
  GetUserDetailsSuccess : (state, action) =>{
      state.loading = false;
      state.editData = action.payload;
  },
  GetUserDetailsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

/// side menu toggles
const toggle = {
  isActive : '',
  isToggle : ''
}
export const toggleReducer = createReducer(toggle, {
  toggleSuccess : (state, action) =>{
    state.menuToggle = action.payload;
  }
});

export const feeReducer = createReducer(initialState, {
  UpdateDoctorFeeRequest : (state) => {
    state.loading = true;
  },
  UpdateDoctorFeeSuccess : (state, action) =>{
    state.loading = false;
    state.feeApiStatus = action.payload;
  },
  UpdateDoctorFeeFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
/// side menu toggles

export const slotsReducer = createReducer(initialState, {
  GetSlotsRequest : (state) => {
    state.loading = true;
  },
  GetSlotsSuccess : (state, action) =>{
    state.loading = false;
    state.slots = action.payload;
  },
  GetSlotsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

/// Date wise slot

export const dateSlotReducer = createReducer(initialState, {
  DateWiseSlotRequest : (state) => {
    state.loading = true;
  },
  DateWiseSlotSuccess : (state, action) =>{
    state.loading = false;
    state.dateSlots = action.payload;
  },
  DateWiseSlotFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});




export const todayAppointmentsReducer = createReducer(initialState, {
  
  GetTodayDoctorAppointmentsRequest : (state) => {
    state.loading = true;
  },
  GetTodayDoctorAppointmentsSuccess : (state, action) =>{
    state.loading = false;
    state.todayDoctorAppointments = action.payload;
  },
  GetTodayDoctorAppointmentsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const appointmentsReducer = createReducer(initialState, {
  GetDoctorAppointmentsRequest : (state) => {
    state.loading = true;
  },
  GetDoctorAppointmentsSuccess : (state, action) =>{
    state.loading = false;
    state.doctorAppointments = action.payload;
  },
  GetDoctorAppointmentsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});


export const doctorsReducer = createReducer(initialState, {
  GetDoctorsRequest : (state) => {
    state.loading = true;
  },
  GetDoctorsSuccess : (state, action) =>{
    state.loading = false;
    state.doctors = action.payload;
  },
  GetDoctorsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});



export const patientAppointmentReducer = createReducer(initialState, {
  GetPatientAppointmentsRequest : (state) => {
    state.loading = true;
  },
  GetPatientAppointmentsSuccess : (state, action) =>{
    state.loading = false;
    state.patientAppointments = action.payload;
  },
  GetPatientAppointmentsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  GetPatientUpcommingAppointmentsRequest : (state) => {
    state.loading = true;
  },
  GetPatientUpcommingAppointmentsSuccess : (state, action) =>{
    state.loading = false;
    state.patientAppointments = action.payload;
  },
  GetPatientUpcommingAppointmentsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  GetPatientCompletedAppointmentsRequest : (state) => {
    state.loading = true;
  },
  GetPatientCompletedAppointmentsSuccess : (state, action) =>{
    state.loading = false;
    state.patientAppointments = action.payload;
  },
  GetPatientCompletedAppointmentsFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});


export const patientPrescriptionReducer = createReducer(initialState, {
  GetPatientPrescriptionRequest : (state) => {
    state.loading = true;
  },
  GetPatientPrescriptionSuccess : (state, action) =>{
    state.loading = false;
    state.patientAllPrescription = action.payload;
  },
  GetPatientPrescriptionFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const patientReportReducer = createReducer(initialState, {
  GetPatientReportRequest : (state) => {
    state.loading = true;
  },
  GetPatientReportSuccess : (state, action) =>{
    state.loading = false;
    state.patientReports = action.payload;
  },
  GetPatientReportFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});


export const patientDashboardReducer = createReducer(initialState, {
  GetPatientDashboardDataRequest : (state) => {
    state.loading = true;
  },
  GetPatientDashboardDataSuccess : (state, action) =>{
    state.loading = false;
    state.patientDashBoard = action.payload;
  },
  GetPatientDashboardDataFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});


export const getSearchDoctorReducer = createReducer(initialState, {
  GetSearchDoctorRequest : (state) => {
    state.loading = true;
  },
  GetSearchDoctorSuccess : (state, action) =>{
    state.loading = false;
    state.searchDoctors = action.payload;
  },
  GetSearchDoctorFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const getUserIdReducer = createReducer(initialState, {
  SetPasswordRequest : (state) => {
    state.loading = true;
  },
  SetPasswordSuccess : (state, action) =>{
    state.loading = false;
    state.userIdForPassword = action.payload;
  },
  SetPasswordFailure : (state, action) =>{
      state.loading = false;
      state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
