import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const adminAPIReducer = createReducer(initialState, {
  createDoctorRequest: (state) => {
    state.loading = true;
  },
  createDoctorSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  createDoctorFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreateDiseaseRequest: (state) => {
    state.loading = true;
  },
  CreateDiseaseSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateDiseaseFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateDiseaseRequest: (state) => {
    state.loading = true;
  },
  UpdateDiseaseSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateDiseaseFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateUserStatusRequest: (state) => {
    state.loading = true;
  },
  UpdateUserStatusSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateUserStatusFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreateDepartmrntRequest: (state) => {
    state.loading = true;
  },
  CreateDepartmrntSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateDepartmrntFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateDepartmrntRequest: (state) => {
    state.loading = true;
  },
  UpdateDepartmrntSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateDepartmrntFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreateFaqRequest: (state) => {
    state.loading = true;
  },
  CreateFaqSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateFaqFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateFaqRequest: (state) => {
    state.loading = true;
  },
  UpdateFaqSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateFaqFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteFaqRequest: (state) => {
    state.loading = true;
  },
  DeleteFaqSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteFaqFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreateNewsRequest: (state) => {
    state.loading = true;
  },
  CreateNewsSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateNewsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //service reducer
  CreateServiceRequest: (state) => {
    state.loading = true;
  },
  CreateServiceSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateServiceFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  CreateAboutRequest: (state) => {
    state.loading = true;
  },
  CreateAboutSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateAboutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateApproachRequest: (state) => {
    state.loading = true;
  },
  UpdateApproachSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateApproachFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  CreateApproachRequest: (state) => {
    state.loading = true;
  },
  CreateApproachSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateApproachFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  UpdateServiceRequest: (state) => {
    state.loading = true;
  },
  UpdateServiceSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateServiceFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateAboutRequest: (state) => {
    state.loading = true;
  },
  UpdateAboutSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateAboutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteServiceRequest: (state) => {
    state.loading = true;
  },
  DeleteServiceSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteServiceFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //service end

  //stories start

  CreateStoriesRequest: (state) => {
    state.loading = true;
  },
  CreateStoriesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateStoriesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateStoriesRequest: (state) => {
    state.loading = true;
  },
  UpdateStoriesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateStoriesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteStoriesRequest: (state) => {
    state.loading = true;
  },
  DeleteStoriesSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteStoriesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //stories end
//client start.
  CreateClientRequest: (state) => {
    state.loading = true;
  },
  CreateClientSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateClientFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdateClientRequest: (state) => {
    state.loading = true;
  },
  UpdateClientSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateClientFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteClientRequest: (state) => {
    state.loading = true;
  },
  DeleteClientSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteClientFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //client end
  UpdateNewsRequest: (state) => {
    state.loading = true;
  },
  UpdateNewsSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateNewsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteNewsRequest: (state) => {
    state.loading = true;
  },
  DeleteNewsSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteNewsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  EnquiryStatusRequest: (state) => {
    state.loading = true;
  },
  EnquiryStatusSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  EnquiryStatusFailure: (state, action) => {
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

export const adminPatientsReducer = createReducer(initialState, {
  GetAdminPatientRequest: (state) => {
    state.loading = true;
  },
  GetAdminPatientSuccess: (state, action) => {
    state.loading = false;
    state.adminPatients = action.payload;
  },
  GetAdminPatientFailure: (state, action) => {
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


export const adminDataDetailsReducer = createReducer(initialState, {
  EditDiseaseRequest: (state) => {
    state.loading = true;
  },
  EditDiseaseSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditDiseaseFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  EditDepartmentRequest: (state) => {
    state.loading = true;
  },
  EditDepartmentSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditDepartmentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  EditFaqRequest: (state) => {
    state.loading = true;
  },
  EditFaqSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditFaqFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  EditNewsRequest: (state) => {
    state.loading = true;
  },
  EditNewsSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditNewsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  EditServiceRequest: (state) => {
    state.loading = true;
  },
  EditServiceSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditServiceFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  EditAboutRequest: (state) => {
    state.loading = true;
  },
  EditAboutSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditAboutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  EditApproachRequest: (state) => {
    state.loading = true;
  },
  EditApproachSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditApproachFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  EditStoriesRequest: (state) => {
    state.loading = true;
  },
  EditStoriesSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditStoriesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  EditClientRequest: (state) => {
    state.loading = true;
  },
  EditClientSuccess: (state, action) => {
    state.loading = false;
    state.dataDetails = action.payload;
  },
  EditClientFailure: (state, action) => {
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

export const adminDiseasesReducer = createReducer(initialState, {
  GetDiseasesRequest: (state) => {
    state.loading = true;
  },
  GetDiseasesSuccess: (state, action) => {
    state.loading = false;
    state.diseases = action.payload;
  },
  GetDiseasesFailure: (state, action) => {
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

export const adminEditAboutReducer = createReducer(initialState, {
  EditAboutsRequest: (state) => {
    state.loading = true;
  },
  EditAboutsSuccess: (state, action) => {
    state.loading = false;
    state.aboutDetails = action.payload;
  },
  EditAboutsFailure: (state, action) => {
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

export const adminDepartmentsReducer = createReducer(initialState, {
  GetDepartmentsRequest: (state) => {
    state.loading = true;
  },
  GetDepartmentsSuccess: (state, action) => {
    state.loading = false;
    state.departments = action.payload;
  },
  GetDepartmentsFailure: (state, action) => {
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


export const adminFaqsReducer = createReducer(initialState, {
  GetFaqsRequest: (state) => {
    state.loading = true;
  },
  GetFaqsSuccess: (state, action) => {
    state.loading = false;
    state.faqs = action.payload;
  },
  GetFaqsFailure: (state, action) => {
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

export const adminNewsReducer = createReducer(initialState, {
  GetNewsRequest: (state) => {
    state.loading = true;
  },
  GetNewsSuccess: (state, action) => {
    state.loading = false;
    state.newses = action.payload;
  },
  GetNewsFailure: (state, action) => {
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

export const adminStoriesReducer = createReducer(initialState, {
  GetStoriesRequest: (state) => {
    state.loading = true;
  },
  GetStoriesSuccess: (state, action) => {
    state.loading = false;
    state.stories = action.payload;
  },
  GetStoriesFailure: (state, action) => {
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

export const adminServiceReducer = createReducer(initialState, {
  GetServiceRequest: (state) => {
    state.loading = true;
  },
  GetServiceSuccess: (state, action) => {
    state.loading = false;
    state.service = action.payload;
  },
  GetServiceFailure: (state, action) => {
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

export const adminClientsReducer = createReducer(initialState, {
  GetClientRequest: (state) => {
    state.loading = true;
  },
  GetClientSuccess: (state, action) => {
    state.loading = false;
    state.clients = action.payload;
  },
  GetClientFailure: (state, action) => {
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


export const adminLatestNewsReducer = createReducer(initialState, {
  GetLatestNewsRequest: (state) => {
    state.loading = true;
  },
  GetLatestNewsSuccess: (state, action) => {
    state.loading = false;
    state.latestnewses = action.payload;
  },
  GetLatestNewsFailure: (state, action) => {
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



export const enquiryReducer = createReducer(initialState, {
  GetEnquiriesRequest: (state) => {
    state.loading = true;
  },
  GetEnquiriesSuccess: (state, action) => {
    state.loading = false;
    state.newses = action.payload;
  },
  GetEnquiriesFailure: (state, action) => {
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


export const adminDashboardReducer = createReducer(initialState, {
  GetDashboardDetailsRequest: (state) => {
    state.loading = true;
  },
  GetDashboardDetailsSuccess: (state, action) => {
    state.loading = false;
    state.dashboardData = action.payload;
  },
  GetDashboardDetailsFailure: (state, action) => {
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


