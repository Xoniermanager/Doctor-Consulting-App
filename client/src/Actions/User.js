import axios from 'axios';

export const registerUser = (name, email, password) => async (dispatch) =>{
    try {
        dispatch({
            type : "RegisterRequest"
        })
        const {data} = await axios.post(
            "/api/register",{ name, email, password },
            {
                headers : {
                    "Content-Type": "application/json",
                }
            }
        )
        localStorage.setItem('token', data.authToken);
        dispatch({
            type : "RegisterSuccess",
            payload : data.user
        })
    } catch (error) {
        localStorage.setItem('token','');
        dispatch({
            type : "RegisterFailure",
            payload: error.response.data.message,
        }) 
    }
}

export const loginUser = (email, password) => async (dispatch) =>{
    try {
        dispatch({
            type : "LoginRequest"
        })
        const {data} = await axios.post(
            "/api/login",{ email, password },
            {
                headers : {
                    "Content-Type": "application/json",
                }
            }
        )
        localStorage.setItem('token', data.authToken);
        dispatch({
            type : "LoginSuccess",
            payload : data.user
        })
    } catch (error) {
       localStorage.setItem('token','');
        dispatch({
            type : "LoginFailure",
            payload: error.response.data.message,
        }) 
    }
}

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get("/api/me", {
          headers :{
              'auth-token' : localStorage.getItem('token')
          }
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
export const forgetPassword = (email) => async (dispatch) =>{
    try {
        dispatch({
            type : "FrorgetPasswordRequest"
        })
        const {data} = await axios.post(
            "/api/forget/password",{ email },
            {
                headers : {
                    "Content-Type": "application/json",
                }
            }
        )
        dispatch({
            type : "FrorgetPasswordSuccess",
            payload : data.user
        })
    } catch (error) {
        dispatch({
            type : "FrorgetPasswordFailure",
            payload: error.response.data.message,
        }) 
    }
}

// update password

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const { data } = await axios.put(
        "/api/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
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