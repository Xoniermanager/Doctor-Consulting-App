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