import axios from "axios";

export const userEnquiry = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "EnquiryRequest",
    });
    const { data } = await axios.post(
      "/api/v1/enquiry",
      { ...userData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.authToken);
    dispatch({
      type: "EnquirySuccess",
      payload: data.message,
    });
  } catch (error) {
    localStorage.setItem("token", "");
    dispatch({
      type: "EnquiryFailure",
      payload: error.response.data.message,
    });
  }
};

export const getDoctorMonSlotByDate = (monDayValue) => async (dispatch) => {
  try {
    dispatch({
      type: "getMondaySlotRequest",
    });
    const { data } = await axios.post(
      "/api/v1/get-mon-slot",
      { ...monDayValue },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "getMondaySlotSuccess",
      payload: data.monslots,
    });
  } catch (error) {
    dispatch({
      type: "getMondaySlotFailure",
      payload: error.response.data.message,
    });
  }
};
export const getDoctorTueSlotByDate = (monDayValue) => async (dispatch) => {
  try {
    dispatch({
      type: "getTuesdaySlotRequest",
    });
    const { data } = await axios.post(
      "/api/v1/get-mon-slot",
      { ...monDayValue },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "getTuesdaySlotSuccess",
      payload: data.monslots,
    });
  } catch (error) {
    dispatch({
      type: "getTuesdaySlotFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (name, email, password, role, phone, departmentId, department, certificate) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
      const { data } = await axios.post(
        "/api/v1/register",
        {
          name,
          email,
          password,
          role,
          phone,
          departmentId,
          department,
          certificate,
        },
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

export const loginUser = (email, password, role) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password, role },
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
export const forgetPassword = (value) => async (dispatch) => {
  try {
    let email = value.email;
    console.log(value.email);
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

export const updateCredentail =
  (marchantId, marchantKey) => async (dispatch) => {
    try {
      dispatch({
        type: "updateCredentialRequest",
      });
      const { data } = await axios.put(
        "/api/v1/update/credential",
        { marchantId, marchantKey },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      dispatch({
        type: "updateCredentialSuccess",
        payload: data.message,
      });
      console.log(data.message);
    } catch (error) {
      dispatch({
        type: "updateCredentialFailure",
        payload: error.response.data.message,
      });
    }
  };

// Reset password

export const resetPassword = (otp) => async (dispatch) => {
  try {
    dispatch({
      type: "SetPasswordRequest",
    });
    const { data } = await axios.post(
      "/api/v1/otp/validate",
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "SetPasswordSuccess",
      payload: data.userId,
    });
  } catch (error) {
    dispatch({
      type: "SetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

// set password

export const setPassword = (patientId, password) => async (dispatch) => {
  try {
    dispatch({
      type: "ResetPasswordRequest",
    });
    const { data } = await axios.put(
      `/api/v1/password/reset/${patientId}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
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
  (
    name,
    academic,
    specialist,
    departmentId,
    department,
    about,
    patientNo,
    surgery,
    experienceYear,
    profileImage
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UpdateDoctorRequest",
      });
      const { data } = await axios.put(
        "/api/v1/doctor/update",
        {
          name,
          academic,
          specialist,
          departmentId,
          department,
          about,
          patientNo,
          surgery,
          experienceYear,
          profileImage,
        },
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

export const updateDoctorFee = (fee) => async (dispatch) => {
  //console.log(fee);
  try {
    dispatch({
      type: "UpdateDoctorFeeRequest",
    });
    const { data } = await axios.put(
      "/api/v1/doctor/updateFee",
      { fee },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateDoctorFeeSuccess",
      payload: data.message,
    });
    //console.log(data.message);
  } catch (error) {
    dispatch({
      type: "UpdateDoctorFeeFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateDoctorEmailTemplate =
  (email_template) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateDoctorEmailTemplateRequest",
      });
      const { data } = await axios.put(
        "/api/v1/doctor/updateemailtemplate",
        { email_template },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "UpdateDoctorEmailTemplateSuccess",
        payload: data.message,
      });
      console.log(data.message);
    } catch (error) {
      dispatch({
        type: "UpdateDoctorEmailTemplateFailure",
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

// Doctor details by id
export const doctorDetailById = (userId) => async (dispatch) => {
  //console.log('cddascsdcsd',userId);
  try {
    dispatch({
      type: "GetUsersDetailsRequest",
    });
    const { data } = await axios.get(`/api/v1/doctor-details/${userId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetUsersDetailsSuccess",
      payload: data.doctor,
    });
    //console.log(data.doctor);
  } catch (error) {
    dispatch({
      type: "GetUsersDetailsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPaymentDetails = (orderId) => async (dispatch) => {
  //console.log('order',orderId);
  try {
    dispatch({
      type: "GetUsersPaymentRequest",
    });
    const { data } = await axios.get(`/api/v1/payment-details/${orderId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetUsersPaymentSuccess",
      payload: data.payment,
    });
    //console.log(data);
  } catch (error) {
    dispatch({
      type: "GetUsersPaymentFailure",
      payload: error.response.data.message,
    });
  }
};

// export const createPaytmPayment = (amount,email) => (dispatch) =>{
//   try {
//     dispatch({
//       type: "getPaytmPaymentRequest",
//     });
//     const { data } = await axios.post(
//       "/api/v1/paytm",
//       { amount, email},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//       }
//     );

//     dispatch({
//       type: "getPaytmPaymentSuccess",
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getPaytmPaymentFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

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

// create patient
export const updatePatient =
  (patientId, userValue, profileImage) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePatientRequest",
      });
      const { data } = await axios.post(
        "/api/v1/patient/update",
        { userValue, patientId, profileImage },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "UpdatePatientSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdatePatientFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getBlogDetails = (newsId) => async (dispatch) => {
  //console.log('newsId',newsId)
  try {
    dispatch({
      type: "GetBlogDetailsRequest",
    });
    const { data } = await axios.get(`/api/v1/blog-details/${newsId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetBlogDetailsSuccess",
      payload: data.newses,
    });
    //console.log('news',data.newses);
  } catch (error) {
    dispatch({
      type: "GetBlogDetailsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getDoctorSlotById = (selectedDate,doctorId) => async (dispatch) => {
  //console.log('newsId',doctorId);
  try {
    dispatch({
      type: "GetDoctorSlotsByIdRequest",
    });
    const { data } = await axios.post(
      `/api/v1/get-all-slot`,
      { selectedDate, doctorId: doctorId },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "GetDoctorSlotsByIdSuccess",
      payload: data.slot,
    });
  } catch (error) {
    dispatch({
      type: "GetDoctorSlotsByIdFailure",
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
    const { data } = await axios.delete(`/api/v1/delete-drug/${drugId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

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
    const { data } = await axios.delete(`/api/v1/delete-test/${testId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

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

export const getAllPrescriptionDetails = (patientId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllPrescriptionRequest",
    });
    const { data } = await axios.get(
      `/api/v1/get-all-prescription/${patientId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    //console.log(data);
    dispatch({
      type: "GetAllPrescriptionSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GetAllPrescriptionFailure",
      payload: error.response.data.message,
    });
  }
};

// update test
export const updatePrescription =
  (presId, selectPatient, drugValue, testValue) => async (dispatch) => {
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
      isActive: "",
      isToggle: "",
    };
    if (mebOpen) {
      toggleData = {
        isActive: "is-active",
        isToggle: "menu-toggle",
      };
    } else {
      toggleData = {
        isActive: "",
        isToggle: "",
      };
    }
    dispatch({
      type: "toggleSuccess",
      payload: toggleData,
    });
  } catch (error) {}
};

// slot creation
export const createSlots =
  (manageSlots, slotValue, fieldValue) => async (dispatch) => {
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
  };

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
export const updateSlot =
  (slotId, manageSlots, slotValue, fieldValue) => async (dispatch) => {
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
    const { data } = await axios.delete(`/api/v1/delete-slot/${slotId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
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
export const getSlotByDate = (selectedDate, doctorId) => async (dispatch) => {
  try {
    dispatch({
      type: "DateWiseSlotRequest",
    });
    const { data } = await axios.post(
      `/api/v1/my-slot`,
      { selectedDate, doctorId: doctorId },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
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
export const createDoctorAppointment =
  (formData, patientDetail) => async (dispatch) => {
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
  };

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
    //console.log(data.appointments);
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

export const getDoctorMonthlyEarning = (doctorId) => async (dispatch) => {
  //console.log(doctorId);
  try {
    dispatch({
      type: "GetDoctorMonthlyEarningRequest",
    });
    const { data } = await axios.get(
      `/api/v1/doctor-monthly-earning/${doctorId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    //console.log(data.appointments);
    dispatch({
      type: "GetDoctorMonthlyEarningSuccess",
      payload: data.payment,
    });
    //console.log('testing',data);
  } catch (error) {
    dispatch({
      type: "GetDoctorMonthlyEarningFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPatientPayment = (patientId) => async (dispatch) => {
  //console.log(doctorId);
  try {
    dispatch({
      type: "GetPatientPaymentRequest",
    });
    const { data } = await axios.get(
      `/api/v1/patient-payment/${patientId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    //console.log(data.appointments);
    dispatch({
      type: "GetPatientPaymentSuccess",
      payload: data.payment,
    });
    //console.log('testing',data);
  } catch (error) {
    dispatch({
      type: "GetPatientPaymentFailure",
      payload: error.response.data.message,
    });
  }
};


// export const getDoctorAppointments = () => async (dispatch) => {
//   try {
//       const { data } = await axios.get('/api/v1/doctor-appointments',{
//               headers: {
//                 "auth-token": localStorage.getItem("token"),
//               }});
//       //console.log(data.appointments);
//       dispatch({ type: "FETCH_Appointment", payload: data.appointments });
//   } catch (error) {
//       console.log('casdcasdcsad',error);
//   }
// };

// get all doctor appointments
export const getTodaysDoctorAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetTodayDoctorAppointmentsRequest",
    });
    const { data } = await axios.get("/api/v1/today-doctor-appointments", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetTodayDoctorAppointmentsSuccess",
      payload: data.appointments,
    });
  } catch (error) {
    dispatch({
      type: "GetTodayDoctorAppointmentsFailure",
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
    const { data } = await axios.delete(`/api/v1/delete-appointment/${appId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
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

////Patients

// get all doctors
export const getDoctors = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetDoctorsRequest",
    });
    const { data } = await axios.get("/api/v1/patient/doctors", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetDoctorsSuccess",
      payload: data.doctors,
    });
  } catch (error) {
    dispatch({
      type: "GetDoctorsFailure",
      payload: error.response.data.message,
    });
  }
};

// get all patient appointments
export const getPatientAppointments = (patientId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientAppointmentsRequest",
    });
    const { data } = await axios.get(
      `/api/v1/patient/appointments/${patientId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "GetPatientAppointmentsSuccess",
      payload: data.patientAppointments,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientAppointmentsFailure",
      payload: error.response.data.message,
    });
  }
};

// get patient upcomming appointments
export const getPatientUpcommingAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientUpcommingAppointmentsRequest",
    });
    const { data } = await axios.get("/api/v1/patient/upcomming-appointments", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetPatientUpcommingAppointmentsSuccess",
      payload: data.patientAppointments,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientUpcommingAppointmentsFailure",
      payload: error.response.data.message,
    });
  }
};

// get patient completed appointments
export const getPatientCompletedAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientCompletedAppointmentsRequest",
    });
    const { data } = await axios.get("/api/v1/patient/completed-appointments", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetPatientCompletedAppointmentsSuccess",
      payload: data.patientAppointments,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientCompletedAppointmentsFailure",
      payload: error.response.data.message,
    });
  }
};

// get Patient prescriptions
export const getPatientPrescription = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientPrescriptionRequest",
    });
    const { data } = await axios.get("/api/v1/patient/prescriptions", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetPatientPrescriptionSuccess",
      payload: data.patientAllPrescription,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientPrescriptionFailure",
      payload: error.response.data.message,
    });
  }
};

// get Patient prescription details By Id
export const getPatientPrescriptionDetails = (presId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientPrescriptionByIdRequest",
    });
    const { data } = await axios.get(`/api/v1/patient/prescription/${presId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetPatientPrescriptionByIdSuccess",
      payload: data.prescription,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientPrescriptionByIdFailure",
      //  payload: error.response.data.message,
    });
  }
};

// report creation by patient
export const createReport = (formData, reportDocument) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateReportRequest",
    });
    const { data } = await axios.post(
      "/api/v1/patient/create-report",
      { formData, reportDocument },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "CreateReportSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateReportFailure",
      payload: error.response.data.message,
    });
  }
};

// get all doctor appointments
export const getPatientReports = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientReportRequest",
    });
    const { data } = await axios.get("/api/v1/patient/reports", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetPatientReportSuccess",
      payload: data.patientReports,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientReportFailure",
      payload: error.response.data.message,
    });
  }
};

// get all doctor appointments
export const getPatientDashboard = (selectedDate) => async (dispatch) => {
  try {
    dispatch({
      type: "GetPatientDashboardDataRequest",
    });
    const { data } = await axios.post(
      "/api/v1/patient/dashboard",
      { selectedDate },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "GetPatientDashboardDataSuccess",
      payload: data.patientDashBoard,
    });
  } catch (error) {
    dispatch({
      type: "GetPatientDashboardDataFailure",
      payload: error.response.data.message,
    });
  }
};

// get search doctor
export const getSearchDoctor = (key) => async (dispatch) => {
  try {
    dispatch({
      type: "GetSearchDoctorRequest",
    });
    const { data } = await axios.get(`/api/v1/search/doctor/${key}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetSearchDoctorSuccess",
      payload: data.doctors,
    });
  } catch (error) {
    dispatch({
      type: "GetSearchDoctorFailure",
      payload: error.response.data.message,
    });
  }
};

// submit test reports
export const submitTestReport = (formData) => async (dispatch) => {
  try {
    console.log("action", formData);
    dispatch({
      type: "SubmitTestReportRequest",
    });
    const { data } = await axios.post(
      "/api/v1/patient/submit-report",
      { formData },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "SubmitTestReportSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "SubmitTestReportFailure",
      payload: error.response.data.message,
    });
  } 
};
