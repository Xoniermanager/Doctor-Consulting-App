import { configureStore } from '@reduxjs/toolkit';
import { forgetPasswordReducer, userReducer } from './Reducers/User';
import dashboardReducer from './Reducers/dashboardReducer';
import callReducer from './Reducers/callReducer';

const store = configureStore({
    reducer : {
      dashboard : dashboardReducer,
      call : callReducer,
      user : userReducer,
      forgetPassword : forgetPasswordReducer
    }
})

export default store;