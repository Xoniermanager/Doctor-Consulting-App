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
})

export const forgetPasswordReducer = createReducer(initialState, {
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


clearErrors: (state) => {
    state.error = null;
  },
});