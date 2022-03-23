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
  FrorgetPasswordRequest: (state) => {
    state.loading = true;
  },
  FrorgetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  FrorgetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

clearErrors: (state) => {
    state.error = null;
  },
});