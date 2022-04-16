import axios from "axios";

export const registerUser =
  (name, email, password, role) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
      const { data } = await axios.post(
        "/api/v1/register",
        { name, email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", data.authToken);
      dispatch({
        type: "RegisterSuccess",
        payload: data.message,
      });
    } catch (error) {
      localStorage.setItem("token", "");
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.authToken);
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    localStorage.setItem("token", "");
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

// forget password
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "ForgetPasswordRequest",
    });
    const { data } = await axios.post(
      "/api/v1/forget/password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "ForgetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ForgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

// update password

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

// Reset password

export const resetPassword = (otp, password) => async (dispatch) => {
  try {
    dispatch({
      type: "ResetPasswordRequest",
    });
    const { data } = await axios.put(
      "/api/v1/password/reset",
      { otp, password },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "ResetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ResetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

// update doctor profile
export const updateDoctorProfile =
  (name, academic, specialist, about) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateDoctorRequest",
      });
      const { data } = await axios.put(
        "/api/v1/doctor/update",
        { name, academic, specialist, about },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "UpdateDoctorSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdateDoctorFailure",
        payload: error.response.data.message,
      });
    }
  };

// update language data
export const updateDoctorLanguage = (videoUrl, langArr) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateDoctorLanguageRequest",
    });
    const { data } = await axios.put(
      "/api/v1/doctor/language",
      { videoUrl, langArr },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateDoctorLanguageSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateDoctorLanguageFailure",
      payload: error.response.data.message,
    });
  }
};

// update experience data
export const updateDoctorExperience = (expValue) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateDoctorExperienceRequest",
    });
    const { data } = await axios.put(
      "/api/v1/doctor/experience",
      { expValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateDoctorExperienceSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateDoctorExperienceFailure",
      payload: error.response.data.message,
    });
  }
};

// update doctor Clinic Awards
export const updateClinicAwards =
  (clinicAddr, docterAcademic, doctorAward) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateDoctorClinicAwardRequest",
      });
      const { data } = await axios.post(
        "/api/v1/doctor/awardclinic",
        { clinicAddr, docterAcademic, doctorAward },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "UpdateDoctorClinicAwardSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdateDoctorClinicAwardFailure",
        payload: error.response.data.message,
      });
    }
  };

// create patient
export const createPatient = (userValue) => async (dispatch) => {
  try {
    dispatch({
      type: "CreatePatientRequest",
    });
    const { data } = await axios.post(
      "/api/v1/patient/create",
      { ...userValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreatePatientSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreatePatientFailure",
      payload: error.response.data.message,
    });
  }
};

// get patient
export const getPatient = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientRequest",
    });
    const { data } = await axios.get("/api/v1/patient", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetPatientSuccess",
      payload: data.patient,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientFailure",
      payload: error.response.data.message,
    });
  }
};

// create drug
export const createDrug = (drugValue) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateDrugRequest",
    });
    const { data } = await axios.post(
      "/api/v1/create-drug",
      { ...drugValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateDrugSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateDrugFailure",
      payload: error.response.data.message,
    });
  }
};

// get drugs
export const getDrug = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetDrugsRequest",
    });
    const { data } = await axios.get("/api/v1/drugs", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetDrugsSuccess",
      payload: data.drug,
    });
  } catch (error) {
    dispatch({
      type: "GetDrugsFailure",
      payload: error.response.data.message,
    });
  }
};


// update drug
export const updateDrug = (drugId, drugValue) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateDrugRequest",
    });
    const { data } = await axios.put(
      `/api/v1/update-drug/${drugId}`,
      { ...drugValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateDrugSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateDrugFailure",
      payload: error.response.data.message,
    });
  }
};

// edit drug data
export const editDrug = (drugId) => async (dispatch) => {
  try {
    dispatch({
      type: "EditDrugRequest",
    });
    const { data } = await axios.get(`/api/v1/edit-drug/${drugId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditDrugSuccess",
      payload: data.drug,
    });
  } catch (error) {
    dispatch({
      type: "EditDrugFailure",
      payload: error.response.data.message,
    });
  }
};
// delete drug
export const deleteDrug = (drugId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteDrugRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/delete-drug/${drugId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "DeleteDrugSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteDrugFailure",
      payload: error.response.data.message,
    });
  }
};

// create test
export const createTest = (testValue) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateTestRequest",
    });
    const { data } = await axios.post(
      "/api/v1/create-test",
      { ...testValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateTestSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateTestFailure",
      payload: error.response.data.message,
    });
  }
};


// update test
export const updateTest = (testId, testValue) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateTestRequest",
    });
    const { data } = await axios.put(
      `/api/v1/update-test/${testId}`,
      { ...testValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateTestSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateTestFailure",
      payload: error.response.data.message,
    });
  }
};

// get tests
export const getTests = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetTestsRequest",
    });
    const { data } = await axios.get("/api/v1/tests", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetTestsSuccess",
      payload: data.tests,
    });
  } catch (error) {
    dispatch({
      type: "GetTestsFailure",
      payload: error.response.data.message,
    });
  }
};

// edit test data
export const editTest = (testId) => async (dispatch) => {
  try {
    dispatch({
      type: "EditTestRequest",
    });
    const { data } = await axios.get(`/api/v1/edit-test/${testId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditTestSuccess",
      payload: data.test,
    });
  } catch (error) {
    dispatch({
      type: "EditTestFailure",
      payload: error.response.data.message,
    });
  }
};

// delete test
export const deleteTest = (testId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteTestRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/delete-test/${testId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "DeleteTestSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteTestFailure",
      payload: error.response.data.message,
    });
  }
};


// create prescription
export const createPrescription =
  (selectPatient, drugValue, testValue) => async (dispatch) => {
    try {
      dispatch({
        type: "createPrescriptionRequest",
      });
      const { data } = await axios.post(
        "/api/v1/create-prescription",
        { selectPatient, drugValue, testValue },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "createPrescriptionSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "createPrescriptionFailure",
        payload: error.response.data.message,
      });
    }
  };

// get prescriptions
export const getPrescription = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPrescriptionRequest",
    });
    const { data } = await axios.get("/api/v1/prescriptions", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetPrescriptionSuccess",
      payload: data.prescriptions,
    });
  } catch (error) {
    dispatch({
      type: "GetPrescriptionFailure",
      payload: error.response.data.message,
    });
  }
};


// delete test
export const deletePrescription = (presId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeletePrescriptionRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/delete-prescription/${presId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "DeletePrescriptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeletePrescriptionFailure",
      payload: error.response.data.message,
    });
  }
};


// edit prescription data
export const editPrescription = (presId) => async (dispatch) => {
  try {
    dispatch({
      type: "EditPrescriptionRequest",
    });
    const { data } = await axios.get(`/api/v1/edit-prescription/${presId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditPrescriptionSuccess",
      payload: data.prescription,
    });
  } catch (error) {
    dispatch({
      type: "EditPrescriptionFailure",
      payload: error.response.data.message,
    });
  }
};

// update test
export const updatePrescription =  (presId, selectPatient, drugValue, testValue) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdatePrescriptionRequest",
    });
    const { data } = await axios.put(
      `/api/v1/update-prescription/${presId}`,
      { selectPatient, drugValue, testValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdatePrescriptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdatePrescriptionFailure",
      payload: error.response.data.message,
    });
  }
};


// status data
export const toggleMenus = (mebOpen) => async (dispatch) => {
  try {
    let toggleData = {
      isActive : '',
      isToggle : ''
    }
    if(mebOpen){
      toggleData = {
        isActive : 'is-active',
        isToggle : 'menu-toggle'
      }
		 }else{
      toggleData = {
        isActive : '',
        isToggle : ''
      }
		}
    dispatch({
      type: "toggleSuccess",
      payload: toggleData,
    });
  } catch (error) {

  }
};

// slot creation 
export const createSlots =  (manageSlots, slotValue, fieldValue) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateSlotRequest",
    });
    const { data } = await axios.post(
      "/api/v1/create-slots",
      { manageSlots, slotValue, fieldValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateSlotSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateSlotFailure",
      payload: error.response.data.message,
    });
  }
}

// get slots
export const getSlots = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetSlotsRequest",
    });
    const { data } = await axios.get("/api/v1/all-slots", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetSlotsSuccess",
      payload: data.slots,
    });
  } catch (error) {
    dispatch({
      type: "GetSlotsFailure",
      payload: error.response.data.message,
    });
  }
};

// edit slot data
export const editSlot = (slotId) => async (dispatch) => {
  try {
    dispatch({
      type: "EditSlotRequest",
    });
    const { data } = await axios.get(`/api/v1/edit-slot/${slotId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditSlotSuccess",
      payload: data.slot,
    });
  } catch (error) {
    dispatch({
      type: "EditSlotFailure",
      payload: error.response.data.message,
    });
  }
};

// update Slot
export const updateSlot =  (slotId, manageSlots, slotValue, fieldValue) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateSlotRequest",
    });
    const { data } = await axios.put(
      `/api/v1/update-slot/${slotId}`,
      { manageSlots, slotValue, fieldValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateSlotSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateSlotFailure",
      payload: error.response.data.message,
    });
  }
};


// delete slot
export const deleteSlot = (slotId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteSlotRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/delete-slot/${slotId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "DeleteSlotSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteSlotFailure",
      payload: error.response.data.message,
    });
  }
};

// get slots by date
export const getSlotByDate = (selectedDate) => async (dispatch) => {
  try {
    dispatch({
      type: "DateWiseSlotRequest",
    });
    const { data } = await axios.post(`/api/v1/my-slot`,  
    { selectedDate, doctorId : '' },
    {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "DateWiseSlotSuccess",
      payload: data.slot,
    });
  } catch (error) {
    dispatch({
      type: "DateWiseSlotFailure",
      payload: error.response.data.message,
    });
  }
};

// appointment creation by doctor
export const createDoctorAppointment =  (formData, patientDetail) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateAppointmentRequest",
    });
    const { data } = await axios.post(
      "/api/v1/create-appointment",
      { formData, patientDetail },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "CreateAppointmentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateAppointmentFailure",
      payload: error.response.data.message,
    });
  }
}


// get all doctor appointments
export const getDoctorAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetDoctorAppointmentsRequest",
    });
    const { data } = await axios.get("/api/v1/doctor-appointments", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetDoctorAppointmentsSuccess",
      payload: data.appointments,
    });
  } catch (error) {
    dispatch({
      type: "GetDoctorAppointmentsFailure",
      payload: error.response.data.message,
    });
  }
};

// Get Doctor Appointment details by id
export const getAppointmentDetailsById = (appId) => async (dispatch) => {
  try {
    dispatch({
      type: "AppointmentDetailsByIdRequest",
    });
    const { data } = await axios.get(`/api/v1/appointment-detail/${appId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "AppointmentDetailsByIdSuccess",
      payload: data.appointment,
    });
  } catch (error) {
    dispatch({
      type: "AppointmentDetailsByIdFailure",
      payload: error.response.data.message,
    });
  }
};

// delete appointment
export const deleteAppointmentById = (appId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteAppointmentRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/delete-appointment/${appId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "DeleteAppointmentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteAppointmentFailure",
      payload: error.response.data.message,
    });
  }
};
