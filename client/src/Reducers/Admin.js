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